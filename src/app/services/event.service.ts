import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  // Subjects
  private scrollToComponentEventSubject = new Subject<string>();

  // Observable stream
  scrollToComponentEventSubject$ = this.scrollToComponentEventSubject.asObservable();

  // Methods to emit events
  emitScrollToComponentEvent(componentId: string) {
    this.scrollToComponentEventSubject.next(componentId);
  }
}
