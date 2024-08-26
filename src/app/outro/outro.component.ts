import { Component } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-outro',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './outro.component.html',
  styleUrl: './outro.component.css'
})
export class OutroComponent {

}
