import * as freeport from 'freeport'

/**
 * Promisify freeport.
 */
export function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    freeport((err, port) => {
      if (err) {
        reject(err)
      }
      resolve(port)
    })
  })
}
