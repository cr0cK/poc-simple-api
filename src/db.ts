import { Connection } from 'typeorm'

let connection: Connection | undefined

export function setConnection(conn: Connection): void {
  connection = conn
}

export function getConnection(): Connection {
  if (!connection) {
    throw new Error('Connection is not defined')
  }

  return connection
}
