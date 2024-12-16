import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { WeatherPart } from 'types';

export class WeatherCoordinatesDto {
  @ApiProperty({ example: 45.133, description: 'Latitude of the location', required: true })
  @IsNumber({}, { message: 'Must be a float number' })
  readonly lat: number;

  @ApiProperty({ example: 7.367, description: 'Longitude of the location', required: true })
  @IsNumber({}, { message: 'Must be a float number' })
  readonly lon: number;

  @ApiProperty({ example: 'current', description: 'Part of the weather data (e.g., current, hourly, daily)', required: false })
  @IsEnum({ message: 'Must be one of current, hourly, daily' })
  @IsOptional()
  readonly part: WeatherPart;
}
Object.defineProperty(WeatherCoordinatesDto, 'name', {
  value: 'Coordinates for weather data',
});
