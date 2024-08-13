import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { LoadingService } from './services/loading.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: LoadingService, multi: true }
  ]
};
