import { ILogger } from './logger'

export function logException(
  logger: ILogger,
  err: any,
  customMessage?: string
) {
  if (customMessage) {
    logger.error(`↓ ${customMessage} ↓`)
    logger.debug(String(err))
  } else {
    logger.error('An exception has occurred:', String(err))
  }

  if (process.env.NODE_ENV === 'development' && err && err.stack) {
    logger.debug(err.stack)
  }
}
