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
  public el: HTMLElement
  private readonly paddingBuffer = 48

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
    const fullWidth = this.el.parentElement?.offsetWidth || window.innerWidth
    const parentWidth = fullWidth - this.paddingBuffer
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

  public calculateFontSize(text: string): string {
    const clone = this.el.cloneNode(true) as HTMLElement
    clone.style.visibility = 'hidden'
    clone.style.position = 'absolute'
    clone.style.whiteSpace = 'nowrap'
    clone.innerText = text

    document.body.appendChild(clone)

    let fontSize = 10
    const fullWidth = this.el.parentElement?.offsetWidth || window.innerWidth
    const parentWidth = fullWidth - this.paddingBuffer

    while (fontSize < 300) {
      clone.style.fontSize = `${fontSize}px`
      const { width } = clone.getBoundingClientRect()
      if (width > parentWidth) {
        fontSize--
        break
      }
      fontSize++
    }

    document.body.removeChild(clone)
    return `${fontSize}px`
  }
}
