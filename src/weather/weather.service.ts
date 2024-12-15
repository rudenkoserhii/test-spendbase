import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from './weather.entity';
import { COORDINATES } from 'types';

@Injectable()
export class WeatherService {
    private readonly apiKey = process.env.OPENWEATHERMAP_API_KEY;
    private readonly url = process.env.OPENWEATHERMAP_URL;

    constructor(
        @InjectRepository(Weather)
        private weatherRepository: Repository<Weather>,
    ) { }

    async fetchAndSaveWeather(coordinates: COORDINATES): Promise<Weather> {
        const { lat, lon, part } = coordinates || {};

        const response = await axios.get(
            this.url,
            {
                params: {
                    lat,
                    lon,
                    exclude: part,
                    appid: this.apiKey,
                }
            }
        );

        const weatherData = response.data;

        const weather = this.weatherRepository.create({
            lat,
            lon,
            part,
            data: weatherData,
        });

        return this.weatherRepository.save(weather);
    }

    async getWeather(coordinates: COORDINATES): Promise<Weather> {
        const { lat, lon, part } = coordinates || {};

        return this.weatherRepository.findOne({
            where: { lat, lon, part },
        });
    }
}
