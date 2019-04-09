import * as Ajv from 'ajv'
import * as fs from 'fs-extra'
import * as path from 'path'
import { logger } from './logger'
import { isDefined } from './isDefined'

const schemas: Map<string, object> = new Map()

/**
 * Load all schemas.
 */
export function loadSchemas(schemasDir: string) {
  const files = fs.readdirSync(schemasDir)

  files.forEach(file => {
    const fullPath = path.join(schemasDir, file)
    const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    schemas.set(file, content)
  })
}

/**
 * Validate the configuration object with a JSON schema.
 */
export function validateObject<T>(
  schemaName: string,
  object: T
): Ajv.ErrorObject[] | false {
  const schema = schemas.get(schemaName)

  if (!schema) {
    logger.error('JSON schema not found')
    return false
  }

  const ajv = Ajv()
  const validate = ajv.compile(schema)

  validate(object)

  if (isDefined(validate.errors)) {
    return validate.errors
  }

  return []
}
