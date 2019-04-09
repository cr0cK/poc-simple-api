import { logger } from './logger'
import { validateObject } from './validate'

/**
 * Check object with a JSON schema.
 * Throw exception if the validation has failed.
 */
export function assertOutput<T>(schemaName: string, object: T): void {
  const errors = validateObject(schemaName, object)

  if (!errors) {
    throw new Error('Validation failed')
  }

  if (errors.length) {
    logger.error(
      'Validation fails:',
      JSON.stringify(object, null, 2),
      JSON.stringify(errors, null, 2)
    )
    throw new Error('Output data validation has failed')
  }
}
