import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';

export interface Photo {
  photo: string;
  thumbnail: string;
  caption: string;
}

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [LightgalleryModule, NgFor],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})

export class PhotosComponent {
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
        fileName: 'patio.jpg',
        caption: 'Covered patio overlooking the beautiful gardens and Keurbooms river with Weber braai'
      },
      {
        fileName: 'open_plan_living_area.jpg',
        caption: 'Open plan living area that walks out onto the covered patio'
      },
      {
        fileName: 'couch.jpg',
        caption: 'Open plan living area'
      },
      {
        fileName: 'kitchen.jpg',
        caption: 'Open plan fully equipped kitchen with everything you need for your holiday'
      },
      {
        fileName: 'kitchen_2.jpg',
        caption: 'Kitchen'
      },
      {
        fileName: 'tv_bar.jpg',
        caption: 'Bar area'
      },
      {
        fileName: 'tv_bar_2.jpg',
        caption: 'Smart Android TV'
      },
      {
        fileName: 'room_1.jpg',
        caption: 'Bedroom 1 - with 2 x Single XL Beds that can be converted to King XL'
      },
      {
        fileName: 'bathroom_1.jpg',
        caption: 'Bathroom 1 - En-suite with shower'
      },
      {
        fileName: 'room_2.jpg',
        caption: 'Bedroom 2 - with Queen XL bed and a view of the gardens'
      },
      {
        fileName: 'room_2_2.jpg',
        caption: 'Bedroom 2 - with Queen XL bed'
      },
      {
        fileName: 'bathroom_2.jpg',
        caption: 'Bathroom 2 - En-suite with shower'
      },
      {
        fileName: 'patio_view.jpg',
        caption: 'Your view from the patio'
      },
      {
        fileName: 'playground.jpg',
        caption: 'Playground for the kids'
      },
      {
        fileName: 'tennis_court.jpg',
        caption: 'Tennis Court'
      },
      {
        fileName: 'pool_area.jpg',
        caption: 'Pool Area'
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