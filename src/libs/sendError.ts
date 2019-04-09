import { Response } from 'express'

interface IServerError {
  error: string
}

/**
 * Generic function to send errors in routers.
 */
export function sendError(res: Response, err: any) {
  let errors: IServerError

  if (err instanceof Error) {
    errors = {
      error: err.message
    }

    res.status(500).send(errors)
    return
  }

  errors = {
    error: err.message
  }

  res.status(500).send(errors)
}
