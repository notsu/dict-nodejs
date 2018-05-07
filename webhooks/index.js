import _ from 'lodash'
import { replyMessages } from 'dict/config/messages'
import line from 'dict/connectors/line'
import { getDefinitionAndsynonyms } from 'dict/services/dictionary'
import { rateLimit } from 'dict/services/rateLimit'

/**
 * Event handler
 * @param  {Object} event Event object from LINE
 * @return {null}
 */
const eventHandler = async event => {
  const eventType = _.get(event, 'type', false)
  const messageType = _.get(event, 'message.type', false)
  let messages = []

  if (eventType === 'message' && messageType === 'text') {
    const isExceedLimit = await rateLimit(event.source.userId)
    if (isExceedLimit) {
      console.log('exceed here !!!')
      return line.replyMessage(event.replyToken, {
        type: 'text',
        text: replyMessages.exceedLimit,
      })
    }

    messages = await getDefinitionAndsynonyms(event)

    if (!messages) {
      return false
    }
  } else {
    messages.push({
      type: 'text',
      text: replyMessages.nomatch,
    })
  }

  line.replyMessage(event.replyToken, messages)
}

export default (req, res) => {
  Promise.all(req.body.events.map(eventHandler)).then(result => res.json(result))
}
