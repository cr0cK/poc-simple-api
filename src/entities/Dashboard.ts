import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import DashboardWidget from './DashboardWidget'

@Entity()
export default class Dashboard {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    length: 100
  })
  name!: string

  @OneToMany(
    type => DashboardWidget,
    dashboardWidget => dashboardWidget.dashboard
  )
  dashboardWidgets!: DashboardWidget[]
}
