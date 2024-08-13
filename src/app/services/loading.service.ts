import { Injectable, isDevMode } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private progressSubject = new Subject<number>();
  progress$ = this.progressSubject.asObservable();

  private loadingResources: Set<string> = new Set();
  private observer: PerformanceObserver;

  private numberOfResources = 25;
  private count = 0;
  // private totalSize = 0;
  // private replace1 = 'http://localhost:4200/';
  // private replace2 = 'https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/';

  constructor() {
    this.observer = new PerformanceObserver((list) => {
      // console.log(list.getEntries().length);
      // console.log(list.getEntries());
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          if (isDevMode() && !this.count)
            this.numberOfResources--;
          // let sizeInKb = 0
          // if ('transferSize' in entry && entry instanceof PerformanceResourceTiming) {
          //   sizeInKb = entry.transferSize / (1024);
          // }

          this.count++;

          // console.log(`${this.count} - Resource: ${entry.name.replace(this.replace1, '').replace(this.replace2, '')}, Load Start Time After Page Init: ${(entry.startTime / 1000).toFixed(2)}s, Duration: ${(entry.duration / 1000).toFixed(2)}s, Size: ${sizeInKb.toFixed(2)}kb`);

          // if (this.count >= this.numberOfResources)
          //   console.log(`Total init size: ${this.totalSize.toFixed(2)}kb`);

          if (entry.duration === 0) {
            // Entry is starting to load
            this.loadingResources.add(entry.name);
          } else {
            // Entry has finished loading
            this.loadingResources.delete(entry.name);
          }

          if (this.count > this.numberOfResources)
            throw new Error(`Update number of resources to load (numberOfResources = ${this.count})`)

          // this.totalSize += sizeInKb;
          let downloadProgress = this.count / this.numberOfResources * 100;

          if (entry.name.endsWith('favicon.ico') || downloadProgress > 99.5 || this.count == this.numberOfResources)
          {
            downloadProgress = 100;
            if (this.count < this.numberOfResources)
              throw new Error(`Update number of resources to load (numberOfResources = ${this.count})`)
          }
            
          this.progressSubject.next(downloadProgress);
        }
      });
    });
    this.observer.observe({ entryTypes: ['resource'] });
  }

  getLoadingStatus(): boolean {
    return this.loadingResources.size > 0;
  }
}