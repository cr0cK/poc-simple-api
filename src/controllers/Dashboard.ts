import { getConnection } from 'typeorm'
import EntityDashboard from '../entities/Dashboard'

export default class Dashboard {
  // static async get(partialDashboard: Partial<EntityDashboard>) {
  //   await getConnection().manager.find(EntityDashboard)
  // }

  static async create(
    partialDashboard: Partial<EntityDashboard>
  ): Promise<EntityDashboard> {
    const dashboard = Object.assign(new EntityDashboard(), partialDashboard)
    await getConnection().manager.save(dashboard)

    return getConnection().manager.findOneOrFail(EntityDashboard, {
      id: dashboard.id
    })
  }
}
