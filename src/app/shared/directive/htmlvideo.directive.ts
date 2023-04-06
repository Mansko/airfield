import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[video]'
})
export class HTMLVideoDirective {

  public element: HTMLVideoElement;

  constructor(elRef: ElementRef) {
    this.element = elRef.nativeElement;
   }

}
