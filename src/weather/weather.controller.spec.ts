import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherCoordinatesDto } from './dto';
import { WeatherPart } from 'types';
import { MESSAGES } from 'consts';

describe('WeatherController', () => {
  let controller: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: {
            fetchAndSaveWeather: jest.fn(),
            getWeather: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get<WeatherService>(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fetchAndSaveWeather', () => {
    it('should save weather data successfully', async () => {
      const mockWeather = { id: 1, lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT, data: {} };
      jest.spyOn(weatherService, 'fetchAndSaveWeather').mockResolvedValue(mockWeather);

      const coordinates: WeatherCoordinatesDto = { lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT };
      const result = await controller.fetchAndSaveWeather(coordinates);

      expect(result).toEqual(mockWeather);
      expect(weatherService.fetchAndSaveWeather).toHaveBeenCalledWith(coordinates);
    });

    it('should throw an error if fetch and save fails', async () => {
      jest.spyOn(weatherService, 'fetchAndSaveWeather').mockRejectedValue(new Error(MESSAGES.ERROR_FETCH_AND_SAVE));

      const coordinates: WeatherCoordinatesDto = { lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT };

      await expect(controller.fetchAndSaveWeather(coordinates)).rejects.toThrow(MESSAGES.ERROR_FETCH_AND_SAVE);
    });
  });

  describe('getWeather', () => {
    it('should return weather data successfully', async () => {
      const mockWeather = { id: 1, lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT, data: {} };
      jest.spyOn(weatherService, 'getWeather').mockResolvedValue(mockWeather);

      const coordinates: WeatherCoordinatesDto = { lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT };
      const result = await controller.getWeather(coordinates);

      expect(result).toEqual(mockWeather);
      expect(weatherService.getWeather).toHaveBeenCalledWith(coordinates);
    });

    it('should throw an error if weather data is not found', async () => {
      jest.spyOn(weatherService, 'getWeather').mockResolvedValue(null);

      const coordinates: WeatherCoordinatesDto = { lat: 45.133, lon: 7.367, part: WeatherPart.CURRENT };

      await expect(controller.getWeather(coordinates)).rejects.toThrow(MESSAGES.NO_WEATHERE_RECORDS);
    });
  });
});