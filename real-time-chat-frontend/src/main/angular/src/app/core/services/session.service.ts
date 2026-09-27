import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly localStorage = inject(LocalStorageService);

  private readonly userSignal = signal<User | null>(this.localStorage.getUser());

  readonly currentUser = this.userSignal.asReadonly();
  readonly isLoggedIn = computed(() => this.userSignal() !== null);

  setUser(user: User): void {
    this.localStorage.setUser(user);
    this.userSignal.set(user);
  }

  logout(): void {
    this.localStorage.clearUser();
    this.userSignal.set(null);
  }
}
