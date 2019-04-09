import { Response } from 'express'

/**
 * Generic function to send errors in routers.
 */
export function sendError(res: Response, err: any) {
  if (err instanceof Error) {
    res.status(500).send({
      err: err.message
    })
    return
  }

  res.status(500).send({
    err: 'Fatal Error'
  })
}
