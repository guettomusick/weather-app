import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';
@Pipe({
  name: 'timezone'
})
export class TimezonePipe implements PipeTransform {

  transform(value: any, timezone: string): any {
    return moment.tz(value, timezone).tz(moment.tz.guess(), true).toDate();
  }

}
