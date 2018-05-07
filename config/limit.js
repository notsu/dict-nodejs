/**
 * Rate limit for API
 * @type {Object}
 */
export const rateLimit = {
  oxfordMonth: 3000,
  oxfordMinute: 60,
  perUserMinute: 10,
}

/**
 * Rate limit key for Redis
 * @type {Object}
 */
export const rateLimitKey = {
  oxfordMonth: 'oxford:limit:month',
  oxfordMinute: 'oxford:limit:minute',
  perUserMinute: 'limit:minute', // Prefix with `user:${lineId}:limit:minute`
}

export default {
  rateLimit,
  rateLimitKey,
}
