import * as faker from 'faker'
import { connect } from '../db'
import Dashboard from '../entities/Dashboard'
import DashboardWidget from '../entities/DashboardWidget'
import OptionType, { OptionTypeEnum } from '../entities/OptionType'
import { logException } from '../libs/logException'
import { logger } from '../libs/logger'
import WidgetOption from '../entities/WidgetOption'

async function populate() {
  const connection = await connect()

  // reset DB
  await connection.dropDatabase()
  await connection.synchronize()

  await connection.transaction(async transEntityMngr => {
    /**
     * Populate some dashboards
     */
    const dashboard1 = await transEntityMngr.save(Dashboard, {
      name: faker.random.words(3)
    })
    const dashboard2 = await transEntityMngr.save(Dashboard, {
      name: faker.random.words(3)
    })
    const dashboard3 = await transEntityMngr.save(Dashboard, {
      name: faker.random.words(3)
    })

    /**
     * Populate some dashboards widgets
     */
    const dashboardWidget1 = await transEntityMngr.save(DashboardWidget, {
      title: faker.random.words(3),
      posX: 0,
      posY: 0,
      width: 400,
      height: 300,
      dashboard: dashboard1
    })

    const dashboardWidget2 = await transEntityMngr.save(DashboardWidget, {
      title: faker.random.words(3),
      posX: 0,
      posY: 0,
      width: 400,
      height: 300,
      dashboard: dashboard1
    })

    const dashboardWidget3 = await transEntityMngr.save(DashboardWidget, {
      title: faker.random.words(3),
      posX: 0,
      posY: 0,
      width: 400,
      height: 300,
      dashboard: dashboard2
    })

    /**
     * Populate option types
     */
    const typeDataOption = await transEntityMngr.save(OptionType, {
      type: OptionTypeEnum.dataOption
    })

    const typeDisplayOption = await transEntityMngr.save(OptionType, {
      type: OptionTypeEnum.displayOption
    })

    /**
     * Populate widget options
     */
    await transEntityMngr.save(WidgetOption, {
      key: 'directoryId',
      value: '1',
      optionType: typeDataOption,
      widget: dashboardWidget1
    })

    await transEntityMngr.save(WidgetOption, {
      key: 'directoryId',
      value: '2',
      optionType: typeDataOption,
      widget: dashboardWidget1
    })

    await transEntityMngr.save(WidgetOption, {
      key: 'color',
      value: 'red',
      optionType: typeDisplayOption,
      widget: dashboardWidget1
    })

    await transEntityMngr.save(WidgetOption, {
      key: 'directoryId',
      value: '2',
      optionType: typeDataOption,
      widget: dashboardWidget2
    })
  })
}

populate()
  .then(() => logger.info('Populate done!'))
  .catch(err => {
    logException(logger, err, 'An error has occurred')
    process.exit(1)
  })
