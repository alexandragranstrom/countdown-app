import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FitTextDirective } from './directives/fit-text.directive'
import { CountdownService } from './services/countdown.service'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, FitTextDirective, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventTitle = ''
  eventDateString = ''
  countdown = ''

  constructor(private countdownService: CountdownService) {}

  ngOnInit(): void {
    this.countdownService.countdown$.subscribe(
      (countdown) => (this.countdown = countdown),
    )
    this.countdownService.eventTitle$.subscribe(
      (title) => (this.eventTitle = title),
    )
    this.countdownService.targetDate$.subscribe(
      (date) => (this.eventDateString = date),
    )
  }

  ngOnDestroy(): void {
    this.countdownService.stop()
  }

  onTitleChange(newTitle: string) {
    this.countdownService.setEventTitle(newTitle)
  }

  onDateChange(date: string) {
    this.countdownService.setTargetDate(date)
  }
}
