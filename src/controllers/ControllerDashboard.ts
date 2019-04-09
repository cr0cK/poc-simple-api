import { getConnection } from '../db'
import Dashboard from '../entities/Dashboard'

export default class ControllerDashboard {
  repository = getConnection().getRepository(Dashboard)

  /**
   * Return the list of dashboards.
   */
  async getDashboards(): Promise<Dashboard[]> {
    return this.repository.find()
  }

  /**
   * Create a new dashboard and return the new dashboard.
   */
  async createDashboard(
    partialDashboard: Partial<Dashboard>
  ): Promise<Dashboard> {
    const dashboard = Object.assign(new Dashboard(), partialDashboard)

    return this.repository.manager.transaction(async transEntityMngr => {
      await this.repository.save(dashboard)
      return this.repository.findOneOrFail({
        id: dashboard.id
      })
    })
  }
}
