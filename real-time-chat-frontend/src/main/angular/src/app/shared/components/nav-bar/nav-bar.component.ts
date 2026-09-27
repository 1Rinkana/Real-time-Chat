import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_TEXT } from '../../../resources/constants/text.constants';
import { SessionService } from '../../../core/services/session.service';

/**
 * Globale Navigation der Anwendung. Erscheint auf allen Seiten
 * außer der Registrierung (siehe AppComponent-Template).
 */
@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private readonly router = inject(Router);
  private readonly session = inject(SessionService);

  readonly text = APP_TEXT.NAVIGATION;
  readonly currentUser = this.session.currentUser;

  readonly links = [
    { path: '/chat', label: this.text.CHAT, icon: '💬' },
    { path: '/profile', label: this.text.PROFILE, icon: '👤' },
    { path: '/user-settings', label: this.text.USER_SETTINGS, icon: '⚙️' },
    { path: '/app-settings', label: this.text.APP_SETTINGS, icon: '🛠️' },
  ];

  logout(): void {
    this.session.logout();
    void this.router.navigate(['/registration']);
  }
}
