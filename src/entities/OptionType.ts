import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import WidgetOption from './WidgetOption'

export enum OptionTypeEnum {
  dataOption = 'dataOption',
  displayOption = 'displayOption'
}

@Entity()
export default class OptionType {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' })
  type!: OptionTypeEnum

  @OneToMany(type => WidgetOption, widgetOption => widgetOption.optionType)
  widgetOptions!: WidgetOption[]
}
