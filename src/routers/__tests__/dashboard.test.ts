import axios, { AxiosInstance } from 'axios'
import { connect } from '../../db'
import { logger } from '../../libs/logger'
import { getFreePort } from '../../libs/tests/freeport'
import Server from '../../server'

describe('Dashboard router', () => {
  let server: Server
  let axiosInstance: AxiosInstance
  let port: number

  beforeAll(async () => {
    server = new Server()

    port = await getFreePort()

    axiosInstance = axios.create({
      baseURL: `http://localhost:${port}`,
      timeout: 1000
    })

    const connection = await connect('test')
    await connection.dropDatabase()
    await connection.synchronize()

    return server
      .bindLogger(logger)
      .configureServer()
      .configureRouters()
      .configureSchemas()
      .start(port)
      .then(() => logger.log('Server started'))
  })

  afterAll(() => {
    return server.stop().then(() => logger.log('Server stopped'))
  })

  describe('POST /dashboards', () => {
    it('should create a dashboard', () => {
      return axiosInstance
        .post(`/dashboards`, { name: 'MyDashboard' })
        .then(response => {
          expect(response.data).toEqual({ id: 1, name: 'MyDashboard' })
        })
    })

    it('should increment the primary column', () => {
      return axiosInstance
        .post(`/dashboards`, { name: 'MyDashboard2' })
        .then(response => {
          expect(response.data).toEqual({ id: 2, name: 'MyDashboard2' })
        })
    })
  })

  describe('GET /dashboards', () => {
    it('should return dashboards', () => {
      return axiosInstance.get(`/dashboards`).then(response => {
        expect(response.data).toEqual([
          { id: 1, name: 'MyDashboard' },
          { id: 2, name: 'MyDashboard2' }
        ])
      })
    })
  })
})
