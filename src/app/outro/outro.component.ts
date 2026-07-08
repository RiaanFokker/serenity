import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';

@Component({
    selector: 'app-outro',
    imports: [ContactComponent],
    templateUrl: './outro.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './outro.component.css'
})
export class OutroComponent {

}
