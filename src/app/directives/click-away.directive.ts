import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickAway]',
  standalone: true
})
export class ClickAwayDirective {
  @Output() clickAwayEvent = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: EventTarget | null) {
    if (!(targetElement instanceof Node) || !this.elementRef.nativeElement.contains(targetElement)) {
      this.clickAwayEvent.emit();
    }
  }
}
