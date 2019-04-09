import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'
import Dashboard from './Dashboard'
import WidgetOption from './WidgetOption'

@Entity()
export default class DashboardWidget {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  title!: string

  @Column({ type: 'int' })
  posX!: number

  @Column({ type: 'int' })
  posY!: number

  @Column({ type: 'int' })
  width!: number

  @Column({ type: 'int' })
  height!: number

  @ManyToOne(type => Dashboard, dashboard => dashboard.dashboardWidgets, {
    nullable: false
  })
  dashboard!: Dashboard

  @OneToMany(type => WidgetOption, widgetOption => widgetOption.widget)
  options!: WidgetOption[]
}
