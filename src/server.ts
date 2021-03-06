import * as bodyParser from 'body-parser'
import * as colors from 'colors'
import * as express from 'express'
import * as http from 'http'
import * as morgan from 'morgan'
import { Connection } from 'typeorm'
import { connect } from './db'
import { getConfig } from './libs/config'
import { logException } from './libs/logException'
import { ILogger } from './libs/logger'
import { loadSchemas } from './libs/validate'
import { schemasDir } from './paths'
import { routerDashboard } from './routers/dashboard'

export default class Server {
  private app: express.Express
  private httpServer: http.Server | undefined
  private logger: ILogger = console

  constructor() {
    this.app = express()
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  getApp() {
    return this.app
  }

  getServer() {
    return this.httpServer
  }

  /**
   * Bind Morgan logs with the logger passed in args.
   */
  bindLogger(logger: ILogger): Server {
    this.app.use(
      morgan('dev', {
        stream: {
          write: logger.info.bind(logger)
        }
      })
    )

    // override default logger
    this.logger = logger

    return this
  }

  /**
   * Initialize servers.
   */
  configureServer() {
    this.httpServer = http.createServer(this.app)
    return this
  }

  /**
   * Configure the index router.
   */
  configureRouters(): Server {
    this.app.use('/dashboards', routerDashboard())

    this.app.use((req, res) => {
      res.status(404).send()
    })

    return this
  }

  /**
   * Load JSON schemas.
   */
  configureSchemas(): Server {
    loadSchemas(schemasDir)
    return this
  }

  /**
   * Start the server.
   */
  start(port?: number, host?: string): Promise<Server> {
    const config = getConfig()
    const httpServer = this.httpServer

    if (!httpServer) {
      throw new Error('HTTP server is undefined!')
    }

    const finalPort = port || config.port
    const finalHost = host || config.host

    return new Promise((resolve, reject) => {
      httpServer.listen(
        finalPort,
        // @ts-ignore ??
        finalHost,
        (err: any) => {
          if (err) {
            logException(this.logger, err, 'Error when starting the server.')
            reject(err)
            return
          }

          this.logger.info(
            `Server is listening on ${colors.bold.underline(
              `${finalHost}:${finalPort}`
            )}.`
          )

          resolve(this)
        }
      )
    })
  }

  /**
   * Connect to the DB and save the connection.
   */
  async connectToDB(): Promise<Connection> {
    return connect('default')
  }

  /**
   * Stop the server.
   */
  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        this.logger.warn('The server instance is not defined.')
        return resolve()
      }

      this.httpServer.close((err: any) => {
        if (err) {
          logException(this.logger, err, 'Error when closing API server.')
          return reject(err)
        }

        resolve()
      })
    })
  }
}
