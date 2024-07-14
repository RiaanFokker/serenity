import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IntroComponent } from './intro/intro.component';
import { ContactComponent } from './contact/contact.component';
import { PhotosComponent } from './photos/photos.component';
import { RatesComponent } from './rates/rates.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { OutroComponent } from './outro/outro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingPageComponent, IntroComponent, ContactComponent, PhotosComponent, RatesComponent, AmenitiesComponent, OutroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'serenity-ang';
}
