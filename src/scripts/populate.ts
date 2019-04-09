import * as faker from 'faker'
import { connect } from '../db'
import Dashboard from '../entities/Dashboard'
import DashboardWidget from '../entities/DashboardWidget'
import { logException } from '../libs/logException'
import { logger } from '../libs/logger'

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
    await transEntityMngr.save(DashboardWidget, {
      title: faker.random.words(3),
      posX: 0,
      posY: 0,
      width: 400,
      height: 300,
      dashboard: dashboard1
    })

    await transEntityMngr.save(DashboardWidget, {
      title: faker.random.words(3),
      posX: 0,
      posY: 0,
      width: 400,
      height: 300,
      dashboard: dashboard1
    })

    await transEntityMngr.save(DashboardWidget, {
      title: faker.random.words(3),
      posX: 0,
      posY: 0,
      width: 400,
      height: 300,
      dashboard: dashboard2
    })
  })
}

populate()
  .then(() => logger.info('Populate done!'))
  .catch(err => {
    logException(logger, err, 'An error has occurred')
    process.exit(1)
  })
