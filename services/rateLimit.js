import _ from 'lodash'
import redis from 'dict/connectors/redis'
import config from 'dict/config/limit'

/**
 * Rate limit condition
 * @param  {String} lineId LINE's ID of user who inform search
 * @return {Boolean}       If it's not exceed, it will return true
 */
export const rateLimit = async lineId => {
  if (_.isEmpty(lineId)) {
    return true
  }

  const userKey = `user:${lineId}:${config.rateLimitKey.perUserMinute}`

  // Oxford rate limit per month
  const oxfordMonth = await redis.getAsync(config.rateLimitKey.oxfordMonth)
  if (oxfordMonth > config.rateLimit.oxfordMonth) {
    return true
  }

  // Oxford rate limit per minute
  const oxfordMinute = await redis.getAsync(config.rateLimitKey.oxfordMinute)
  if (oxfordMinute > config.rateLimit.oxfordMinute) {
    return true
  }

  const perUserMinute = await redis.getAsync(userKey)
  if (perUserMinute > config.rateLimit.perUserMinute) {
    return true
  }

  if (_.isEmpty(oxfordMonth)) {
    await redis.setAsync(config.rateLimitKey.oxfordMonth, 1, 'EX', 2592000) // 1 month
  } else {
    await redis.incrAsync(config.rateLimitKey.oxfordMonth)
  }

  if (_.isEmpty(oxfordMinute)) {
    await redis.setAsync(config.rateLimitKey.oxfordMinute, 1, 'EX', 60) // 1 minute
  } else {
    await redis.incrAsync(config.rateLimitKey.oxfordMinute)
  }

  if (_.isEmpty(perUserMinute)) {
    await redis.setAsync(userKey, 1, 'EX', 60) // 1 minute
  } else {
    await redis.incrAsync(userKey)
  }

  return false
}
