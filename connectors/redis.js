import redis from 'redis'
import bluebird from 'bluebird'
import config from 'dict/config/redis'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

export default redis.createClient({
  host: config.host,
  port: config.port,
})