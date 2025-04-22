import {
  Directive,
  ElementRef,
  AfterViewInit,
  HostListener,
  Input,
} from '@angular/core'

@Directive({
  selector: '[fitText]',
  standalone: true,
})
export class FitTextDirective implements AfterViewInit {
  @Input() set text(value: string) {
    if (value !== undefined) {
      this.updateFontSize(value)
    }
  }

  public el: HTMLElement
  private readonly paddingBuffer = 48

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement
  }

  ngAfterViewInit(): void {
    this.updateFontSize(this.el.innerText)
  }

  @HostListener('window:resize')
  onResize() {
    this.updateFontSize(this.el.innerText)
  }

  private updateFontSize(text: string): string {
    const fullWidth = this.el.parentElement?.offsetWidth || window.innerWidth
    const parentWidth = fullWidth - this.paddingBuffer
    let fontSize = 10

    if (text !== this.el.innerText) {
      const clone = this.el.cloneNode(true) as HTMLElement
      clone.style.visibility = 'hidden'
      clone.style.position = 'absolute'
      clone.style.whiteSpace = 'nowrap'
      clone.innerText = text
      document.body.appendChild(clone)

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
    } else {
      this.el.style.whiteSpace = 'nowrap'
      while (fontSize < 300) {
        this.el.style.fontSize = `${fontSize}px`
        const { width } = this.el.getBoundingClientRect()
        if (width > parentWidth) {
          fontSize--
          break
        }
        fontSize++
      }
    }

    this.el.style.fontSize = `${fontSize}px`
    return `${fontSize}px`
  }
}
