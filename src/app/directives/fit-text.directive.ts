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
  private readonly containerHeightRatio = 0.4 // Maximum 40% of container height

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
    const containerHeight =
      this.el.parentElement?.offsetHeight || window.innerHeight
    const parentWidth = fullWidth - this.paddingBuffer
    const maxHeight = containerHeight * this.containerHeightRatio

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
        const { width, height } = clone.getBoundingClientRect()
        if (width > parentWidth || height > maxHeight) {
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
        const { width, height } = this.el.getBoundingClientRect()
        if (width > parentWidth || height > maxHeight) {
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
