import { Component, inject } from '@angular/core';
import { SessionService } from './core/services/session.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly session = inject(SessionService);

  readonly isLoggedIn = this.session.isLoggedIn;
}
