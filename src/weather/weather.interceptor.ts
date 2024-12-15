import { Injectable } from '@nestjs/common';
import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          sunrise: data.data.current.sunrise,
          sunset: data.data.current.sunset,
          temp: data.data.current.temp,
          feels_like: data.data.current.feels_like,
          pressure: data.data.current.pressure,
          humidity: data.data.current.humidity,
          uvi: data.data.current.uvi,
          wind_speed: data.data.current.wind_speed,
        };
      }),
    );
  }
}
