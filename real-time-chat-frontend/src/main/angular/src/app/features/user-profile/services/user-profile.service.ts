import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { UserProfile } from '../../../core/models/user.model';
import { API_ENDPOINTS } from '../../../resources/constants/api.constants';

/**
 * Feature-Service der User-Profile-Page. Alle Requests ans Backend
 * für das Benutzerprofil laufen ausschließlich hierüber.
 */
@Injectable({ providedIn: 'root' })
export class UserProfileService {
  constructor(private readonly http: HttpService) {}

  getProfile(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${API_ENDPOINTS.USER_PROFILE}/${userId}`);
  }

  updateProfile(userId: string, profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${API_ENDPOINTS.USER_PROFILE}/${userId}`, profile);
  }
}
