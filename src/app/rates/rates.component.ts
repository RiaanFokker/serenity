import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { Photo } from '../photos/photos.component';

@Component({
    selector: 'app-rates',
    imports: [LightgalleryModule, NgFor, NgIf, DatePipe],
    templateUrl: './rates.component.html',
    styleUrl: './rates.component.css'
})
export class RatesComponent {
  specialRate = 1000
  specialMinNights = 5
  endDate = new Date('2025-07-31')
  showSpecials = new Date() < this.endDate;

  standardRate = 1200
  standardMinNights = 5

  peakRate = 2700
  peakMinNights = 14

  settings = {
    mobileSettings: {
      controls: false,
      showCloseIcon: true,
      download: false
    },
    download: false,
    controls: false,
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
