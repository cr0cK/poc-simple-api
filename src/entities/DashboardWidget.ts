import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import Dashboard from './Dashboard'

@Entity()
export default class DashboardWidget {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    length: 200
  })
  title!: string

  @Column('int')
  posX!: number

  @Column('int')
  posY!: number

  @Column('int')
  width!: number

  @Column('int')
  height!: number

  @ManyToOne(type => Dashboard, dashboard => dashboard.dashboardWidgets)
  dashboard!: Dashboard
}
