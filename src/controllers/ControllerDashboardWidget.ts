import { getConnection } from '../db'
import DashboardWidget from '../entities/DashboardWidget'

export default class ControllerDashboardWidget {
  repository = getConnection().getRepository(DashboardWidget)

  /**
   * Return the list of widgets for a dashboard.
   */
  async getWidgets(options: { dashboard: number }): Promise<DashboardWidget[]> {
    return this.repository.find({
      where: options
    })
  }
}
