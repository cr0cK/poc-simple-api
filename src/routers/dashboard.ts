import { Router } from 'express'
import { get, set } from 'lodash'
import ControllerDashboard from '../controllers/ControllerDashboard'
import ControllerDashboardWidget from '../controllers/ControllerDashboardWidget'
import ControllerWidgetOption from '../controllers/ControllerWidgetOption'
import Dashboard from '../entities/Dashboard'
import { logException } from '../libs/logException'
import { logger } from '../libs/logger'
import { sendError } from '../libs/sendError'

export function routerDashboard() {
  const router = Router()

  /**
   * Return the list of dashboards.
   */
  router.get('/', async (req, res) => {
    try {
      const ctrl = new ControllerDashboard()
      const dashboards = await ctrl.getDashboards()
      res.json(dashboards)
    } catch (err) {
      logException(logger, err)
      sendError(res, err)
    }
  })

  /**
   * Create a new dashboard.
   */
  router.post('/', async (req, res) => {
    try {
      const payload = req.body as Partial<Dashboard>

      const ctrl = new ControllerDashboard()
      const dashboard = await ctrl.createDashboard(payload)

      res.json(dashboard)
    } catch (err) {
      logException(logger, err)
      sendError(res, err)
    }
  })

  /**
   * Retrieve the list of widgets.
   */
  router.get('/:dashboardId/widgets', async (req, res) => {
    try {
      const ctrl = new ControllerDashboardWidget()
      const dashboards = await ctrl.getWidgets({
        dashboard: req.params.dashboardId
      })

      res.json(dashboards)
    } catch (err) {
      logException(logger, err)
      sendError(res, err)
    }
  })

  /**
   * Retrieve the list of options of a widget.
   */
  router.get('/:dashboardId/widgets/:widgetId/options', async (req, res) => {
    try {
      const ctrl = new ControllerWidgetOption()

      // retrieve options
      const options = await ctrl.getOptions({
        widget: req.params.widgetId
      })

      // group options by optionType / optionKey
      const optionsGroupByType = options.reduce((acc, option) => {
        const existingValue = get(acc, [option.optionType.type, option.key])

        // concatenate values into an array if the key is already present
        const value = existingValue
          ? [...existingValue, option.value]
          : option.value

        set(acc, [option.optionType.type, option.key], value)
        return acc
      }, {})

      const results = {
        type: 'TODO',
        series: [optionsGroupByType]
      }

      res.json(results)
    } catch (err) {
      logException(logger, err)
      sendError(res, err)
    }
  })

  return router
}
