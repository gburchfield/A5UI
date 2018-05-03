import { elementAt } from 'rxjs/operator/elementAt';
import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNavbar]'
})
export class NavbarDirective {

  @HostListener('click') toggleOpen() {
    var elem = document.getElementById('menu');
    elem.classList.toggle('in');
  }

  constructor(private element: ElementRef) { }

}
