import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          sunrise: data?.data?.sys?.sunrise,
          sunset: data?.data?.sys?.sunset,
          temp: data?.data?.main?.temp,
          feels_like: data?.data?.main?.feels_like,
          pressure: data?.data?.main?.pressure,
          humidity: data?.data?.main?.humidity,
          uvi: data?.data?.current?.uvi,
          wind_speed: data?.data?.wind?.speed,
        };
      }),
    );
  }
}
