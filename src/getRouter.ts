import { Request, Response, Router } from 'express'
import CDashboard from './controllers/Dashboard'
import Dashboard from './entities/Dashboard'
import { logException } from './libs/logException'
import { logger } from './libs/logger'

export function getRouter() {
  const router = Router()

  router.post('/dashboard', async (req, res) => {
    try {
      const payload = req.body as Partial<Dashboard>
      const dashboard = await CDashboard.create(payload)
      res.json(dashboard)
    } catch (err) {
      logException(logger, err)
      res.status(500).send(err)
    }
  })

  router.use('/', (req, res) => {
    res.send('Welcome to simple-api!')
  })

  return router
}
