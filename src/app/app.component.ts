import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { FitTextDirective } from './directives/fit-text.directive'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, FitTextDirective],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventTitle = ''
  eventDateString = ''
  countdown = ''
  private intervalId?: ReturnType<typeof setInterval>

  @ViewChild('titleRef', { static: false, read: FitTextDirective })
  titleRef?: FitTextDirective
  @ViewChild('countdownRef', { static: false, read: FitTextDirective })
  countdownRef?: FitTextDirective

  ngOnInit(): void {
    this.startCountdown()
    this.recalculateText()
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId)
  }

  private startCountdown() {
    this.intervalId = setInterval(() => {
      if (!this.eventDateString) {
        this.countdown = ''
        return
      }

      const now = new Date()
      const eventDate = new Date(this.eventDateString)

      if (isNaN(eventDate.getTime())) {
        this.countdown = ''
        return
      }

      const diff = eventDate.getTime() - now.getTime()
      let newCountdown = ''

      if (diff <= 0) {
        newCountdown = 'Event has passed 🎉'
      } else {
        const seconds = Math.floor(diff / 1000) % 60
        const minutes = Math.floor(diff / (1000 * 60)) % 60
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        newCountdown = `${days} days, ${hours} h, ${minutes}m, ${seconds}s`
      }

      const fontSize = this.countdownRef?.calculateFontSize(newCountdown)

      if (fontSize && this.countdownRef) {
        this.countdownRef.el.style.fontSize = fontSize
      }

      this.countdown = newCountdown
    }, 1000)
  }

  recalculateText() {
    this.titleRef?.fitText()
    this.countdownRef?.fitText()
  }
}
