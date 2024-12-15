import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from './weather.entity';

@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.OPENWEATHERMAP_API_KEY;

  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ) {}

  async fetchAndSaveWeather(lat: number, lon: number, part: string): Promise<Weather> {
    console.log('apiKey', this.apiKey);
    
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${this.apiKey}`;
    const response = await axios.get(url);
    console.log(response)
    const weatherData = response.data;

    const weather = this.weatherRepository.create({
      lat,
      lon,
      part,
      data: weatherData,
    });

    return this.weatherRepository.save(weather);
  }

  async getWeather(lat: number, lon: number, part: string): Promise<Weather> {
    return this.weatherRepository.findOne({
      where: { lat, lon, part },
    });
  }
}
