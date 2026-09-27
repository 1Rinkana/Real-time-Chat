import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

const USER_STORAGE_KEY = 'user';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getUser(): User | null {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  }

  setUser(user: User): void {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}
