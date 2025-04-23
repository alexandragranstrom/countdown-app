import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private intervalId?: ReturnType<typeof setInterval>
  private selectedDate = ''
  private countdownSubject = new BehaviorSubject<string>('')

  countdown$ = this.countdownSubject.asObservable()

  constructor() {}

  setTargetDate(date: string) {
    this.selectedDate = date
    this.startCountdown()
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  private startCountdown() {
    this.stop()

    this.intervalId = setInterval(() => {
      if (!this.selectedDate) {
        this.countdownSubject.next('')
        return
      }

      const now = new Date()
      const eventDate = new Date(this.selectedDate)

      if (isNaN(eventDate.getTime())) {
        this.countdownSubject.next('')
        return
      }

      const diff = eventDate.getTime() - now.getTime()

      if (diff <= 0) {
        this.countdownSubject.next('Event has passed 🎉')
      } else {
        const seconds = Math.floor(diff / 1000) % 60
        const minutes = Math.floor(diff / (1000 * 60)) % 60
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        this.countdownSubject.next(
          `${days} days, ${hours} h, ${minutes}m, ${seconds}s`,
        )
      }
    }, 1000)
  }
}
