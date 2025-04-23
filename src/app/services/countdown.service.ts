import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

interface CountdownData {
  targetDate: string
  eventTitle: string
}

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private readonly STORAGE_KEY = 'countdown_data'
  private intervalId?: ReturnType<typeof setInterval>
  private countdownSubject = new BehaviorSubject<string>('')
  private titleSubject = new BehaviorSubject<string>('')
  private targetDateSubject = new BehaviorSubject<string>('')

  countdown$ = this.countdownSubject.asObservable()
  eventTitle$ = this.titleSubject.asObservable()
  targetDate$ = this.targetDateSubject.asObservable()

  constructor() {
    this.loadSavedData()
  }

  private loadSavedData(): void {
    const savedData = localStorage.getItem(this.STORAGE_KEY)
    if (savedData) {
      const { targetDate, eventTitle } = JSON.parse(savedData) as CountdownData
      if (targetDate) {
        this.targetDateSubject.next(targetDate)
        this.startCountdown(targetDate)
      }
      if (eventTitle) {
        this.setEventTitle(eventTitle)
      }
    }
  }

  private saveData(data: Partial<CountdownData>): void {
    const existingData = localStorage.getItem(this.STORAGE_KEY)
    const currentData = existingData ? JSON.parse(existingData) : {}
    const newData = { ...currentData, ...data }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newData))
  }

  setTargetDate(date: string) {
    this.saveData({ targetDate: date })
    this.targetDateSubject.next(date)
    this.startCountdown(date)
  }

  setEventTitle(title: string) {
    this.saveData({ eventTitle: title })
    this.titleSubject.next(title)
  }

  private startCountdown(targetDate: string) {
    this.stop()

    this.intervalId = setInterval(() => {
      if (!targetDate) {
        this.countdownSubject.next('')
        return
      }

      const now = new Date()
      const eventDate = new Date(targetDate)

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

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
