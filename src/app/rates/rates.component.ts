import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LightgalleryModule } from 'lightgallery/angular';
import { Photo } from '../photos/photos.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { IcalService } from '../services/ical.service';

@Component({
    selector: 'app-rates',
    imports: [LightgalleryModule, NgFor, NgIf, DatePipe, FullCalendarModule],
    templateUrl: './rates.component.html',
    styleUrl: './rates.component.css'
})
export class RatesComponent implements OnInit {
  constructor(private icalService: IcalService) { }
  //ACF need a proxy server to fetch the calendar data because https://cors-anywhere.herokuapp.com/ is only for development purposes and not stable for production use
  ngOnInit() {
    const icalLink = 'https://www.airbnb.com/calendar/ical/...'
    this.icalService.getEvents('https://cors-anywhere.herokuapp.com/' + icalLink)
      .subscribe(events => {
        this.calendarOptions.events = events;
      });
  }

  specialRate = 1000
  specialMinNights = 5
  endDate = new Date('2025-07-31')
  showSpecials = new Date() < this.endDate;

  standardRate = 1400
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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: []
  };

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
