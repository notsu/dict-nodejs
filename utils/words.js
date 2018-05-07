import _ from 'lodash'

/**
 * Get the first word from message
 * @param  {String} message Message from user
 * @return {String|Boolean}
 */
export const getFirstWord = message => {
  const words = String(message).split(' ')

  if (words.length > 0) {
    return words.shift()
  }

  return false
}

/**
 * Join words from array to string with "and" at the last word
 * @param  {Array} messages Messages array from dictionary
 * @return {String}         Words which already joined
 */
export const joinWord = messages => {
  if (!_.isArray(messages)) {
    return false
  }

  const lastWord = messages.pop()

  if (messages.length > 0) {
    return `${messages.join(', ')} and ${lastWord}`
  } else {
    return lastWord
  }
}
