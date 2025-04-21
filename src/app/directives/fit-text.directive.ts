import {
  Directive,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core'

@Directive({
  selector: '[fitText]',
  standalone: true,
})
export class FitTextDirective implements AfterViewInit {
  private el: HTMLElement

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement
  }

  ngAfterViewInit(): void {
    this.fitText()
  }

  @HostListener('window:resize')
  onResize() {
    this.fitText()
  }

  public fitText(): void {
    const parentWidth = this.el.parentElement?.offsetWidth || window.innerWidth
    let fontSize = 10
    this.el.style.whiteSpace = 'nowrap'

    while (fontSize < 300) {
      this.el.style.fontSize = `${fontSize}px`
      const { width } = this.el.getBoundingClientRect()
      if (width > parentWidth) {
        fontSize--
        this.el.style.fontSize = `${fontSize}px`
        break
      }
      fontSize++
    }
  }
}
