import { Test, TestingModule } from '@nestjs/testing';
import { WeatherInterceptor } from './weather.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

describe('WeatherInterceptor', () => {
  let weatherInterceptor: WeatherInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherInterceptor],
    }).compile();

    weatherInterceptor = module.get<WeatherInterceptor>(WeatherInterceptor);
  });

  it('should be defined', () => {
    expect(weatherInterceptor).toBeDefined();
  });

  describe('intercept', () => {
    it('should transform weather data correctly', done => {
      const mockData = {
        data: {
          sys: {
            sunrise: 1609459200,
            sunset: 1609502400,
          },
          main: {
            temp: 293.15,
            feels_like: 294.15,
            pressure: 1013,
            humidity: 50,
          },
          current: {
            uvi: 5,
          },
          wind: {
            speed: 5.5,
          },
        }
      };

      const mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnThis(),
      } as unknown as ExecutionContext;

      const mockCallHandler = {
        handle: jest.fn(() => of(mockData)),
      } as unknown as CallHandler;

      const expectedResult = {
        sunrise: 1609459200,
        sunset: 1609502400,
        temp: 293.15,
        feels_like: 294.15,
        pressure: 1013,
        humidity: 50,
        uvi: 5,
        wind_speed: 5.5,
      };

      weatherInterceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (result) => {
          expect(result).toEqual(expectedResult);
          done();
        },
        error: done.fail,
      });
    });

    it('should handle undefined or missing data gracefully', done => {
      const mockData = {
        data: {
          sys: {},
          main: {},
          current: {},
          wind: {},
        }
      };

      const mockExecutionContext = {
        switchToHttp: jest.fn().mockReturnThis(),
        getRequest: jest.fn().mockReturnThis(),
        getResponse: jest.fn().mockReturnThis(),
      } as unknown as ExecutionContext;

      const mockCallHandler = {
        handle: jest.fn(() => of(mockData)),
      } as unknown as CallHandler;

      const expectedResult = {
        sunrise: undefined,
        sunset: undefined,
        temp: undefined,
        feels_like: undefined,
        pressure: undefined,
        humidity: undefined,
        uvi: undefined,
        wind_speed: undefined,
      };

      weatherInterceptor.intercept(mockExecutionContext, mockCallHandler).subscribe({
        next: (result) => {
          expect(result).toEqual(expectedResult);
          done();
        },
        error: done.fail,
      });
    });
  });
});