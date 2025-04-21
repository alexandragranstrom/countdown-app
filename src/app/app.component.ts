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
  eventTitle = 'Midsummer Eve'
  eventDateString = '2024-06-21'
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
      const now = new Date()
      const eventDate = new Date(this.eventDateString)
      const diff = eventDate.getTime() - now.getTime()

      if (diff <= 0) {
        this.countdown = 'Event has passed 🎉'
      } else {
        const seconds = Math.floor(diff / 1000) % 60
        const minutes = Math.floor(diff / (1000 * 60)) % 60
        const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        this.countdown = `${days} days, ${hours} h, ${minutes}m, ${seconds}s`
      }

      this.recalculateText()
    }, 1000)
  }

  recalculateText() {
    this.titleRef?.fitText()
    this.countdownRef?.fitText()
  }
}
