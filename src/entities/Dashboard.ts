import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Dashboard {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    length: 100
  })
  name!: string
}
