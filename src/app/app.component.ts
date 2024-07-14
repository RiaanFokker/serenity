import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { IntroComponent } from './intro/intro.component';
import { ContactComponent } from './contact/contact.component';
import { PhotosComponent } from './photos/photos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LandingPageComponent, IntroComponent, ContactComponent, PhotosComponent], //ACF RouterOutlet not used atm
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'serenity-ang';
}
