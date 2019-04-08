import * as config from '../../config/development.json'

interface IConfig {
  port: number
  host: string
}

export function getConfig(): IConfig {
  return (config as unknown) as IConfig
}
