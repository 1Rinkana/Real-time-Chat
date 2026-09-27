import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { AppSettings } from '../../../core/models/app-settings.model';
import { API_ENDPOINTS } from '../../../resources/constants/api.constants';

/**
 * Feature-Service der App-Settings-Page. Betrifft globale, nicht
 * benutzerspezifische Einstellungen der Anwendung.
 */
@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  constructor(private readonly http: HttpService) {}

  getSettings(): Observable<AppSettings> {
    return this.http.get<AppSettings>(API_ENDPOINTS.APP_SETTINGS);
  }

  updateSettings(settings: AppSettings): Observable<AppSettings> {
    return this.http.put<AppSettings>(API_ENDPOINTS.APP_SETTINGS, settings);
  }
}
