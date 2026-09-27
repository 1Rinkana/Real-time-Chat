import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { APP_TEXT } from '../../../../resources/constants/text.constants';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-registration-page',
  standalone: false,
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss',
})
export class RegistrationPageComponent {
  readonly text = APP_TEXT.REGISTRATION;

  readonly username = signal('');
  readonly errorMessage = signal<string | null>(null);
  readonly isSubmitting = signal(false);

  constructor(
    private readonly registrationService: RegistrationService,
    private readonly router: Router,
  ) {}

  submit(): void {
    const username = this.username().trim();
    if (username.length === 0) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    this.registrationService.register(username).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        void this.router.navigate(['/chat']);
      },
      error: () => {
        this.isSubmitting.set(false);
        this.errorMessage.set(this.text.ERROR_MESSAGE);
      },
    });
  }
}
