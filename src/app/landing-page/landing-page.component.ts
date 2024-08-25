import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClickAwayDirective } from '../directives/click-away.directive';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ClickAwayDirective],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  @ViewChild(ClickAwayDirective, { static: true }) clickAwayDirective!: ClickAwayDirective;
  @ViewChild('hamburgerMenu', { static: true }) hamburgerMenu!: ElementRef<HTMLDivElement>;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    if (this.clickAwayDirective) {
      this.clickAwayDirective.clickAwayEvent.subscribe(() => this.hideDropdown());
    }
  }

  hideDropdown() {
      if(this.hamburgerMenu.nativeElement.classList.contains('active'))
        this.toggleHamRotate();
  }

  toggleHamRotate() {
    this.hamburgerMenu.nativeElement.classList.toggle('active');
  }

  scrollToComponent(componentId: string) {
    this.eventService.emitScrollToComponentEvent(componentId);
  }
}
