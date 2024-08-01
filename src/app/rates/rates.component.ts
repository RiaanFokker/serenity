import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { Photo } from '../photos/photos.component';

@Component({
  selector: 'app-rates',
  standalone: true,
  imports: [LightgalleryModule, NgFor],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.css'
})
export class RatesComponent {
  settings = {
    mobileSettings: {
      controls: true,
      showCloseIcon: true,
      download: false
    },
    download: false,
    hideScrollbar: true,
    mousewheel: true
  };

  photos = this.getPhotoList();

  private getPhotoList(): Photo[] {
    const photosPath = 'assets/images/full_quality/'
    const thumbnailsPath = 'assets/images/thumbnails/'

    const files = [
      {
        fileName: 'keurbooms_river.jpg',
        caption: 'The Keurbooms River Lodge with rolling green lawns just a stone throw away from the ocean'
      },
      {
        fileName: 'sunset.jpg',
        caption: 'A view of the sunset over the Keurbooms River right from your doorstep'
      }
    ];

    let photos: Photo[] = [];
    files.forEach((photo) => {
      photos.push({
        'photo': photosPath + photo.fileName,
        'thumbnail': thumbnailsPath + photo.fileName,
        'caption': photo.caption
      })
    });

    return photos;
  }

}
