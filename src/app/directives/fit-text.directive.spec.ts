import { Component, ElementRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FitTextDirective } from './fit-text.directive'
import { NO_ERRORS_SCHEMA } from '@angular/core'

@Component({
  template: `<div class="container" style="width: 500px; height: 200px;">
    <div fitText [text]="text" style="font-size: 16px;">{{ text }}</div>
  </div>`,
  standalone: true,
  imports: [FitTextDirective],
})
class TestComponent {
  text = 'Short Text' // Start with short text
}

describe('FitTextDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  let element: HTMLElement
  let container: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    container = fixture.nativeElement.querySelector('.container')
    element = fixture.nativeElement.querySelector('[fitText]')
    fixture.detectChanges()
  })

  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') }
    const directive = new FitTextDirective(mockElementRef as ElementRef)
    expect(directive).toBeTruthy()
  })

  it('should decrease font size when text gets longer', (done) => {
    const initialSize = parseFloat(window.getComputedStyle(element).fontSize)

    component.text =
      'This is a much much much longer text that should cause the font size to decrease to fit'
    fixture.detectChanges()

    setTimeout(() => {
      const newSize = parseFloat(window.getComputedStyle(element).fontSize)
      expect(newSize).toBeLessThan(initialSize)
      done()
    }, 0)
  })

  it('should increase font size when text gets shorter', (done) => {
    component.text = 'This is a very very very long text to start with'
    fixture.detectChanges()

    setTimeout(() => {
      const initialSize = parseFloat(window.getComputedStyle(element).fontSize)

      component.text = 'Short'
      fixture.detectChanges()

      setTimeout(() => {
        const newSize = parseFloat(window.getComputedStyle(element).fontSize)
        expect(newSize).toBeGreaterThan(initialSize)
        done()
      }, 0)
    }, 0)
  })

  it('should update font size when container width changes', (done) => {
    const initialSize = parseFloat(window.getComputedStyle(element).fontSize)

    container.style.width = '300px'
    window.dispatchEvent(new Event('resize'))
    fixture.detectChanges()

    setTimeout(() => {
      const newSize = parseFloat(window.getComputedStyle(element).fontSize)
      expect(newSize).toBeLessThan(initialSize)
      done()
    }, 0)
  })

  it('should ensure text width stays within container bounds', (done) => {
    component.text =
      'This is a very long text that should be contained within the parent container width'
    fixture.detectChanges()

    setTimeout(() => {
      const textWidth = element.getBoundingClientRect().width
      const containerWidth = container.getBoundingClientRect().width
      expect(textWidth).toBeLessThanOrEqual(containerWidth)
      done()
    }, 0)
  })

  it('should respect container height ratio', (done) => {
    component.text = 'Test height constraints'
    fixture.detectChanges()

    setTimeout(() => {
      const textHeight = element.getBoundingClientRect().height
      const containerHeight = container.getBoundingClientRect().height
      const maxAllowedHeight = containerHeight * 0.4
      expect(textHeight).toBeLessThanOrEqual(maxAllowedHeight)
      done()
    }, 0)
  })
})
