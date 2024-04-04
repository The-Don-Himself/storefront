import { ApplicationConfig } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload'})), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideHttpClient(withFetch()),
  ]
};
