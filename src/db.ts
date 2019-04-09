import { Connection, createConnection, ConnectionOptions } from 'typeorm'

let connection: Connection | undefined

export async function connect(name: string): Promise<Connection> {
  const conn = await createConnection(name)
  setConnection(conn)

  return conn
}

export function setConnection(conn: Connection): void {
  connection = conn
}

export function getConnection(): Connection {
  if (!connection) {
    throw new Error('Connection is not defined')
  }

  return connection
}
