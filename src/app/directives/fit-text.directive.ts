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
  private readonly containerHeightRatio = 0.4

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
    const container = this.el.parentElement
    if (!container) return ''

    const fullWidth = container.offsetWidth
    const containerHeight = container.offsetHeight
    const parentWidth = fullWidth - this.paddingBuffer
    const maxHeight = containerHeight * this.containerHeightRatio

    const testElement = this.el.cloneNode(true) as HTMLElement
    testElement.style.visibility = 'hidden'
    testElement.style.position = 'absolute'
    testElement.style.whiteSpace = 'nowrap'
    testElement.innerText = text
    document.body.appendChild(testElement)

    let min = 8
    let max = 300
    let bestSize = min

    while (min <= max) {
      const mid = Math.floor((min + max) / 2)
      testElement.style.fontSize = `${mid}px`

      const { width, height } = testElement.getBoundingClientRect()
      const fits = width <= parentWidth && height <= maxHeight

      if (fits) {
        bestSize = mid
        min = mid + 1
      } else {
        max = mid - 1
      }
    }

    document.body.removeChild(testElement)
    this.el.style.fontSize = `${bestSize}px`
    return `${bestSize}px`
  }
}
