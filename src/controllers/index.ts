import { Request, Response, Router } from 'express'

export function registerControllers() {
  const router = Router()

  router.use('/dashboard', (req, res) => {
    res.send('dashboards')
  })

  return router
}
