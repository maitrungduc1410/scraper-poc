import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
})
export class BarComponent {
  @ViewChild('iframe', { read: ElementRef })
  iframe!: ElementRef<HTMLIFrameElement>;

  url: string = '/foo'
  src: SafeResourceUrl = ''
  error: any

  constructor(public sanitizer: DomSanitizer) { }

  submit() {
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  onFrameLoaded() {
    if (!this.iframe) return
    try {
      const document = this.iframe.nativeElement.contentWindow!.document
      const elmnt = document.body;
      
      elmnt.addEventListener('mouseover', (e) => {
        const el = document
        .elementFromPoint(e.clientX, e.clientY)
        console.log(el)
      })
    } catch (error) {
      this.error = error
    }

    // elmnt.addEventListener('mouseout', (e) => {
    //   const el = document
    //   .elementFromPoint(e.clientX, e.clientY)
    //   console.log(el, '==============1111')
    // })
  }
}
