import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { WeatherPart } from 'types';

export class WeatherCoordinatesDto {
  @ApiProperty({
    example: 45.133,
    description: 'Latitude of the location',
    required: true,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'Latitude must be a float number' })
  readonly lat: number;

  @ApiProperty({
    example: 7.367,
    description: 'Longitude of the location',
    required: true,
  })
  @Transform(({ value }) => parseFloat(value))
  @IsNumber({}, { message: 'Longitude must be a float number' })
  readonly lon: number;

  @ApiProperty({
    example: 'current',
    description: 'Part of the weather data (e.g., current, hourly, daily)',
    required: false,
  })
  @IsEnum(WeatherPart, {
    message: 'Part must be one of current, hourly, daily',
  })
  @IsOptional()
  readonly part: WeatherPart;
}
Object.defineProperty(WeatherCoordinatesDto, 'name', {
  value: 'Coordinates for weather data',
});
