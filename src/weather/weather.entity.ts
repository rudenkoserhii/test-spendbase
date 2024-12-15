import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  part: string;

  @Column('json')
  data: any;
}
