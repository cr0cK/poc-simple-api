import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import DashboardWidget from './DashboardWidget'

@Entity()
export default class Dashboard {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  name!: string

  @OneToMany(
    type => DashboardWidget,
    dashboardWidget => dashboardWidget.dashboard
  )
  dashboardWidgets!: DashboardWidget[]
}
