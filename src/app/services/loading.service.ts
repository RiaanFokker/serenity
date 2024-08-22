import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private progressSubject = new Subject<number>();
  progress$ = this.progressSubject.asObservable();

  private loadingResources: Set<string> = new Set();
  private observer: PerformanceObserver;

  private numberOfResources = 22;
  private count = 0;

  constructor() {
    this.observer = new PerformanceObserver((list) => {
      list.getEntriesByType('resource').forEach(async (entry) => {
        const resourceEntry = entry as PerformanceResourceTiming;

        if (resourceEntry.initiatorType != "img")
          return;

        this.count++;

        if (resourceEntry.duration === 0) {
          // Entry is starting to load
          this.loadingResources.add(resourceEntry.name);
        } else {
          // Entry has finished loading
          this.loadingResources.delete(resourceEntry.name);
        }

        if (this.count > this.numberOfResources)
          throw new Error(`Update number of resources to load (numberOfResources = ${this.count})`)

        let downloadProgress = this.count / this.numberOfResources * 100;

        if (downloadProgress > 99.5 || this.count == this.numberOfResources) {
          downloadProgress = 100;

          if (this.count < this.numberOfResources)
            throw new Error(`Update number of resources to load (numberOfResources = ${this.count})`)
        }

        this.progressSubject.next(downloadProgress);
      });
    });

    this.observer.observe({ entryTypes: ['resource'] });
  }

  haveBackgroundImage(): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = 'assets/images/full_quality/background.jpg';

      // Handle the case where the image is cached
      if (img.complete && img.naturalWidth !== 0) {
        resolve(true);
      } else {
        // Listen for load event to handle images that are not immediately complete
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      }
    });
  }

  unsubscribe() {
    this.progressSubject.unsubscribe();
    this.observer.disconnect();
  }
}