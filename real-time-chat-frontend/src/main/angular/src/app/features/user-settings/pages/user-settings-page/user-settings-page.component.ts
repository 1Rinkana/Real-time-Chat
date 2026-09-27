import { Component, OnInit, signal } from '@angular/core';
import { APP_TEXT } from '../../../../resources/constants/text.constants';
import { UserSettingsService } from '../../services/user-settings.service';
import { SessionService } from '../../../../core/services/session.service';
import { UserSettings } from '../../../../core/models/user.model';

const DEFAULT_SETTINGS: UserSettings = {
  notificationsEnabled: true,
  soundEnabled: true,
  language: 'de',
};

@Component({
  selector: 'app-user-settings-page',
  standalone: false,
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.scss',
})
export class UserSettingsPageComponent implements OnInit {
  readonly text = APP_TEXT.USER_SETTINGS;

  readonly settings = signal<UserSettings>(DEFAULT_SETTINGS);
  readonly statusMessage = signal<string | null>(null);
  readonly isSaving = signal(false);

  readonly languages = [
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
  ];

  constructor(
    private readonly settingsService: UserSettingsService,
    private readonly session: SessionService,
  ) {}

  ngOnInit(): void {
    const user = this.session.currentUser();
    if (!user) {
      return;
    }

    this.settingsService.getSettings(user.uuid).subscribe({
      next: (settings) => this.settings.set(settings),
      error: () => this.settings.set(DEFAULT_SETTINGS),
    });
  }

  updateField<K extends keyof UserSettings>(field: K, value: UserSettings[K]): void {
    this.settings.update((current) => ({ ...current, [field]: value }));
  }

  save(): void {
    const user = this.session.currentUser();
    if (!user) {
      return;
    }

    this.isSaving.set(true);
    this.settingsService.updateSettings(user.uuid, this.settings()).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.statusMessage.set(this.text.SAVE_SUCCESS);
      },
      error: () => {
        this.isSaving.set(false);
        this.statusMessage.set(this.text.SAVE_ERROR);
      },
    });
  }
}
