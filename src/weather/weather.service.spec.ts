import axios from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WeatherService } from 'weather/weather.service';
import { Weather } from 'weather/weather.entity';
import { COORDINATES, WeatherPart } from 'types';
import { MESSAGES } from 'consts';

jest.mock('axios');

describe('WeatherService', () => {
  let weatherService: WeatherService;
  let weatherRepository: Repository<Weather>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(Weather),
          useClass: class {
            create = jest.fn().mockImplementation((entity) => entity);
            save = jest.fn().mockImplementation((entity) => Promise.resolve(entity));
            findOne = jest.fn();
          },
        },
      ],
    }).compile();
  
    weatherService = module.get<WeatherService>(WeatherService);
    weatherRepository = module.get<Repository<Weather>>(getRepositoryToken(Weather));
  });

  describe('fetchAndSaveWeather', () => {
    it('should fetch weather data and save it to the database', async () => {
      const mockApiResponse = {
        data: {
          coord: { lon: 7.367, lat: 45.133 },
          weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
          main: { temp: 284.2, feels_like: 282.93, temp_min: 283.06, temp_max: 286.82, pressure: 1021, humidity: 60 },
          wind: { speed: 4.09, deg: 121, gust: 3.47 },
        },
      };
      (axios.get as jest.Mock).mockResolvedValue(mockApiResponse);

      const saveMock = jest.spyOn(weatherRepository, 'save').mockResolvedValue({
        id: 1,
        lat: 45.133,
        lon: 7.367,
        part: WeatherPart.CURRENT,
        data: mockApiResponse.data,
      });

      const coordinates: COORDINATES = { lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT };

      const result = await weatherService.fetchAndSaveWeather(coordinates);

      expect(result).toHaveProperty('lat', 45.133);
      expect(result).toHaveProperty('lon', 7.367);
      expect(result.data).toEqual(mockApiResponse.data);
      expect(saveMock).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if API request fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error(MESSAGES.API_FAILED));

      const coordinates: COORDINATES = { lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT };

      await expect(weatherService.fetchAndSaveWeather(coordinates)).rejects.toThrow(MESSAGES.API_FAILED);
    });
  });

  describe('getWeather', () => {
    it('should return weather data from the database', async () => {
      const mockWeatherData = {
        id: 1,
        lat: 45.133,
        lon: 7.367,
        part: WeatherPart.CURRENT,
        data: {
          coord: { lon: 7.367, lat: 45.133 },
          weather: [{ id: 501, main: 'Rain', description: 'moderate rain', icon: '10d' }],
          main: { temp: 284.2, feels_like: 282.93, temp_min: 283.06, temp_max: 286.82, pressure: 1021, humidity: 60 },
          wind: { speed: 4.09, deg: 121, gust: 3.47 },
        },
      };

      jest.spyOn(weatherRepository, 'findOne').mockResolvedValue(mockWeatherData);

      const coordinates: COORDINATES = { lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT };

      const result = await weatherService.getWeather(coordinates);

      expect(result).toEqual(mockWeatherData);
      expect(result.lat).toBe(45.133);
      expect(result.lon).toBe(7.367);
      expect(result.data).toEqual(mockWeatherData.data);
    });

    it('should return null if weather data is not found in the database', async () => {
        jest.spyOn(weatherRepository, 'findOne').mockResolvedValue(null);
    
        const coordinates: COORDINATES = { lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT };
    
        const result = await weatherService.getWeather(coordinates);
        expect(result).toBeNull();
    });
  });
});
