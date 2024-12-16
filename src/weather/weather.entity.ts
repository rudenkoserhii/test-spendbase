import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { WeatherPart } from 'types';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 123456789,
    description: 'Unique identifier of the weather record',
  })
  id: number;

  @Column({ type: 'numeric' })
  @ApiProperty({ example: 45.133, description: 'Latitude of the location' })
  lat: number;

  @Column({ type: 'numeric' })
  @ApiProperty({ example: 7.367, description: 'Longitude of the location' })
  lon: number;

  @Column()
  @ApiProperty({
    example: 'current',
    description: 'Part of the weather data (e.g., current, hourly, daily)',
  })
  part?: WeatherPart;

  @Column('json')
  @ApiProperty({
    example: {
      coord: { lat: 45.133, lon: 7.367 },
      weather: [
        { id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' },
      ],
      main: {
        temp: 284.2,
        feels_like: 282.93,
        temp_min: 283.06,
        temp_max: 286.82,
      },
      wind: { speed: 4.09, deg: 121, gust: 3.47 },
      rain: { '1h': 2.73 },
      sys: { country: 'IT', sunrise: 1726636384, sunset: 1726680975 },
      timezone: 7200,
      name: 'Province of Turin',
      cod: 200,
    },
    description: 'Weather data in JSON format',
    type: Object,
  })
  data: any;
}
