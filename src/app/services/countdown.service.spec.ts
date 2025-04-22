import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { CountdownService } from './countdown.service'

describe('CountdownService', () => {
  let service: CountdownService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountdownService],
    })
    service = TestBed.inject(CountdownService)
  })

  afterEach(() => {
    service.stop()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should emit empty string when no date is set', (done) => {
    service.countdown$.subscribe((value) => {
      expect(value).toBe('')
      done()
    })
    service.setTargetDate('')
  })

  it('should emit countdown string when valid future date is set', fakeAsync(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    service.setTargetDate(tomorrow.toISOString())
    tick(1000) // Wait for first interval

    service.countdown$.subscribe((value) => {
      expect(value).toContain('days')
      expect(value).toContain('h')
      expect(value).toContain('m')
      expect(value).toContain('s')
    })
  }))

  it('should emit "Event has passed" for past date', fakeAsync(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    service.setTargetDate(yesterday.toISOString())
    tick(1000)

    service.countdown$.subscribe((value) => {
      expect(value).toBe('Event has passed 🎉')
    })
  }))

  it('should stop countdown when stop is called', fakeAsync(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    service.setTargetDate(tomorrow.toISOString())
    tick(1000)

    service.stop()

    spyOn(service['countdownSubject'], 'next')
    tick(1000)

    expect(service['countdownSubject'].next).not.toHaveBeenCalled()
  }))
})
