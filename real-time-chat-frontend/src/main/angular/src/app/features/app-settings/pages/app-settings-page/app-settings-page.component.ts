import { Component, OnInit, signal } from '@angular/core';
import { APP_TEXT } from '../../../../resources/constants/text.constants';
import { AppSettingsService } from '../../services/app-settings.service';
import { API_BASE_URL } from '../../../../resources/constants/api.constants';
import { AppSettings } from '../../../../core/models/app-settings.model';

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  serverUrl: API_BASE_URL,
};

@Component({
  selector: 'app-app-settings-page',
  standalone: false,
  templateUrl: './app-settings-page.component.html',
  styleUrl: './app-settings-page.component.scss',
})
export class AppSettingsPageComponent implements OnInit {
  readonly text = APP_TEXT.APP_SETTINGS;

  readonly settings = signal<AppSettings>(DEFAULT_SETTINGS);
  readonly statusMessage = signal<string | null>(null);
  readonly isSaving = signal(false);

  constructor(private readonly appSettingsService: AppSettingsService) {}

  ngOnInit(): void {
    this.appSettingsService.getSettings().subscribe({
      next: (settings) => this.settings.set(settings),
      error: () => this.settings.set(DEFAULT_SETTINGS),
    });
  }

  updateField<K extends keyof AppSettings>(field: K, value: AppSettings[K]): void {
    this.settings.update((current) => ({ ...current, [field]: value }));
  }

  save(): void {
    this.isSaving.set(true);
    this.appSettingsService.updateSettings(this.settings()).subscribe({
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
