import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IntroComponent } from './intro/intro.component';
import { ContactComponent } from './contact/contact.component';
import { PhotosComponent } from './photos/photos.component';
import { RatesComponent } from './rates/rates.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { OutroComponent } from './outro/outro.component';
import { LoadingService } from './services/loading.service';
import { SplashScreenComponent } from "./splash-screen/splash-screen.component";
import { NgIf, ViewportScroller } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, IntroComponent, ContactComponent, PhotosComponent, RatesComponent, AmenitiesComponent, OutroComponent, SplashScreenComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnDestroy  {
  private progressSub!: Subscription;
  private scrollToComponentEventSubscription!: Subscription;
  loading: boolean = true;
  progress: number = 0;

  constructor(private loadingService: LoadingService, private ngZone: NgZone, private scroller: ViewportScroller, private eventService: EventService) { }

  ngOnInit() {
    // Dummy request
    // this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
    //   data => console.log('HTTP request successful', data),
    //   error => console.log('HTTP request error', error)
    // );
    this.progressSub = this.loadingService.progress$.subscribe(progress => {
      this.ngZone.run(async () => {
        this.progress = progress;
        this.loading = !await this.loadingService.haveBackgroundImage();
        if (!this.loading)
          this.loadingService.unsubscribe();
      });
    });

    this.scrollToComponentEventSubscription = this.eventService.scrollToComponentEventSubject$.subscribe(componentId => this.scrollToComponent(componentId));
  }

  scrollToComponent(componentId: string) {
    this.scroller.scrollToAnchor(componentId);
  }

  ngOnDestroy(): void {
    this.progressSub.unsubscribe();
    this.scrollToComponentEventSubscription.unsubscribe();
  }
}