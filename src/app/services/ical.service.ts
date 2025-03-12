import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ical from 'ical';

@Injectable({
  providedIn: 'root'
})
export class IcalService {
  constructor(private http: HttpClient) {}

  getEvents(url: string): Observable<any[]> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(data => {
        const events = ical.parseICS(data);
        return Object.values(events).map(event => ({
          title: event.summary,
          start: event.start,
          end: event.end
        }));
      })
    );
  }
}
