import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-splash-screen',
    imports: [CommonModule],
    templateUrl: './splash-screen.component.html',
    styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent {
  @Input() progress: number = 0;
  @Input() isLoading: boolean = true;
}