import _ from 'lodash'
import line from 'dict/connectors/line'
import dictionary from 'dict/connectors/oxford'
import { getFirstWord, joinWord } from 'dict/utils/words'

/**
 * Fetch Oxford API to get definition and synonyms back.
 * @param  {String} word Word
 * @return {Object}      Definition and synonyms
 */
export const fetchOxfordAPI = async word => {
  let definitions, synonyms

  try {
    definitions = await dictionary.definitions(word)
  } catch (error) {
    console.log('Definitions Error:', error)
  }

  try {
    synonyms = await dictionary.synonyms(word)
  } catch (error) {
    console.log('Synonyms Error:', error)
  }

  return {
    definitions,
    synonyms,
  }
}

/**
 * Get definition and synonyms
 * @param  {Object} event Event from LINE
 * @return {Object}       Message list for sending back to users
 */
export const getDefinitionAndsynonyms = async event => {
  const message = _.get(event, 'message.text', '')
  const word = getFirstWord(message)

  const result = await fetchOxfordAPI(word)
  if (!result) {
    line.replyMessage(event.replyToken, {
      type: 'text',
      text: `Can not find definition of "${word}", please try again.`,
    })
    return false
  }

  const { definitions, synonyms } = result
  const messages = []
  const definition = _.get(
    definitions,
    'results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]',
    false
  )

  const synonym = _.get(
    synonyms,
    'results[0].lexicalEntries[0].entries[0].senses[0].synonyms',
    false
  )

  if (definition) {
    messages.push({
      type: 'text',
      text: `Definition:

${definition}
      `,
    })
  } else {
    messages.push({
      type: 'text',
      text: `Sorry, we didn't found definition of this word`,
    })
  }

  if (synonym) {
    const slicedsynonyms = synonym.slice(0, 5)
    const textsynonyms = slicedsynonyms.map(syn => syn.text)
    const allsynonyms = joinWord(textsynonyms)

    messages.push({
      type: 'text',
      text: `Synonyms:

${allsynonyms}
      `,
    })
  } else {
    messages.push({
      type: 'text',
      text: `Sorry, we did't found synonyms of this word`,
    })
  }

  return messages
}
