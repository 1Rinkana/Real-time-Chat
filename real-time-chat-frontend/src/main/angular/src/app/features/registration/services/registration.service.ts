import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from '../../../core/services/http.service';
import { SessionService } from '../../../core/services/session.service';
import { User } from '../../../core/models/user.model';
import { API_ENDPOINTS } from '../../../resources/constants/api.constants';

/**
 * Feature-Service der Registration-Page. Kapselt sämtliche Requests
 * ans Backend für diese Seite und schreibt bei Erfolg den User in die Session.
 */
@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(
    private readonly http: HttpService,
    private readonly session: SessionService,
  ) {}

  register(username: string): Observable<User> {
    return this.http
      .post<User>(API_ENDPOINTS.USER, { username })
      .pipe(tap((user) => this.session.setUser(user)));
  }
}
