import { logException } from './libs/logException'
import { logger } from './libs/logger'
import Server from './server'

const server = new Server()

server
  .bindLogger(logger)
  .configureServers()
  .configureControllers()
  .start()
  .catch(err => {
    logException(logger, err, 'An error has occurred when starting the server')
  })
