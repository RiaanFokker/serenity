
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-splash-screen',
    imports: [],
    templateUrl: './splash-screen.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent {
  @Input() progress: number = 0;
  @Input() isLoading: boolean = true;
}