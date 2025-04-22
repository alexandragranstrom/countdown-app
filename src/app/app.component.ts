import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { FitTextDirective } from './directives/fit-text.directive'
import { CountdownService } from './services/countdown.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, FitTextDirective],
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
  }

  ngOnDestroy(): void {
    this.countdownService.stop()
  }

  onTitleChange(newTitle: string) {
    this.eventTitle = newTitle
  }

  onDateChange(date: string) {
    this.eventDateString = date
    this.countdownService.setTargetDate(date)
  }
}
