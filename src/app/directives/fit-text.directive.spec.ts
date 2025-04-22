import { Component, ElementRef } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FitTextDirective } from './fit-text.directive'
import { NO_ERRORS_SCHEMA } from '@angular/core'

@Component({
  template: `<div fitText [text]="text">{{ text }}</div>`,
  standalone: true,
  imports: [FitTextDirective],
})
class TestComponent {
  text = 'Test Text'
}

describe('FitTextDirective', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  let element: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    element = fixture.nativeElement.querySelector('div')
    fixture.detectChanges()
  })

  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') }
    const directive = new FitTextDirective(mockElementRef as ElementRef)
    expect(directive).toBeTruthy()
  })

  it('should set font size on text change', () => {
    const initialFontSize = element.style.fontSize
    component.text = 'New Longer Text for Testing'
    fixture.detectChanges()

    expect(element.style.fontSize).toBeDefined()
    expect(element.style.fontSize).not.toBe(initialFontSize)
  })

  it('should set white-space to nowrap', () => {
    expect(element.style.whiteSpace).toBe('nowrap')
  })

  it('should update font size on window resize', () => {
    const initialFontSize = element.style.fontSize

    window.dispatchEvent(new Event('resize'))
    fixture.detectChanges()

    expect(element.style.fontSize).toBeDefined()
  })
})
