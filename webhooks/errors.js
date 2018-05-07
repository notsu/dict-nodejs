import { JSONParseError, SignatureValidationFailed } from '@line/bot-sdk'

/**
 * Error handler for detect malfunction
 * @param  {Object}   err  Error
 * @param  {Object}   req  Request
 * @param  {Object}   res  Response
 * @param  {Function} next Next tick
 * @return {null}
 */
export default (err, req, res, next) => {
  if (err instanceof SignatureValidationFailed) {
    res.status(401).send(err.signature)
    return
  } else if (err instanceof JSONParseError) {
    res.status(400).send(err.raw)
    return
  }
  next(err) // will throw default 500
}
