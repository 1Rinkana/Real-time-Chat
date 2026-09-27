import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { UserSettings } from '../../../core/models/user.model';
import { API_ENDPOINTS } from '../../../resources/constants/api.constants';

/**
 * Feature-Service der User-Settings-Page.
 */
@Injectable({ providedIn: 'root' })
export class UserSettingsService {
  constructor(private readonly http: HttpService) {}

  getSettings(userId: string): Observable<UserSettings> {
    return this.http.get<UserSettings>(`${API_ENDPOINTS.USER_SETTINGS}/${userId}`);
  }

  updateSettings(userId: string, settings: UserSettings): Observable<UserSettings> {
    return this.http.put<UserSettings>(`${API_ENDPOINTS.USER_SETTINGS}/${userId}`, settings);
  }
}
