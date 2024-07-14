import { Component } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [LightgalleryModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent {
  
}
