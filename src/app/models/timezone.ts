import { ModelAdapter } from './../interfaces/model-adapter';
import { Injectable } from '@angular/core';

export interface TimeZone {
  dstOffset: number;
  rawOffset: number;
  status: string;
  timeZoneId: string;
  timeZoneName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimezoneAdapter implements ModelAdapter<TimeZone> {

  adapt(data: any): TimeZone {
    const tz: TimeZone = {
      dstOffset: data.dstOffset,
      rawOffset: data.rawOffset,
      status: data.status,
      timeZoneId: data.timeZoneId,
      timeZoneName: data.timeZoneName
    };

    return tz;
  }
}
