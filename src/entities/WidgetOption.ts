import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import OptionType from './OptionType'
import DashboardWidget from './DashboardWidget'

@Entity()
export default class WidgetOption {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  key!: string

  @Column({ type: 'varchar' })
  value!: string

  @ManyToOne(type => OptionType, optionType => optionType.widgetOptions, {
    nullable: false
  })
  optionType!: OptionType

  @ManyToOne(
    type => DashboardWidget,
    dashboardWiget => dashboardWiget.options,
    {
      nullable: false
    }
  )
  widget!: DashboardWidget
}
