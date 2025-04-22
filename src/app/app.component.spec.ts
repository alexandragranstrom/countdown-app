import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { FormsModule } from '@angular/forms'
import { FitTextDirective } from './directives/fit-text.directive'
import { CountdownService } from './services/countdown.service'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let countdownService: CountdownService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule],
      providers: [CountdownService],
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    countdownService = TestBed.inject(CountdownService)
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should update eventTitle when onTitleChange is called', () => {
    const testTitle = 'Test Event'
    component.onTitleChange(testTitle)
    expect(component.eventTitle).toBe(testTitle)
  })

  it('should update eventDateString and call service when onDateChange is called', () => {
    const testDate = '2024-12-25'
    spyOn(countdownService, 'setTargetDate')

    component.onDateChange(testDate)

    expect(component.eventDateString).toBe(testDate)
    expect(countdownService.setTargetDate).toHaveBeenCalledWith(testDate)
  })

  it('should display the title in the template', () => {
    const testTitle = 'Test Event'
    component.eventTitle = testTitle
    fixture.detectChanges()

    const titleElement = fixture.nativeElement.querySelector('.event-title')
    expect(titleElement.textContent).toContain(`Time to ${testTitle}`)
  })
})
