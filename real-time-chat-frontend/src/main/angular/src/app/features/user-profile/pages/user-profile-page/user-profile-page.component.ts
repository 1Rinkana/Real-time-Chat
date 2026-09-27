import { Component, OnInit, signal } from '@angular/core';
import { APP_TEXT } from '../../../../resources/constants/text.constants';
import { UserProfileService } from '../../services/user-profile.service';
import { SessionService } from '../../../../core/services/session.service';
import { UserProfile } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-profile-page',
  standalone: false,
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss',
})
export class UserProfilePageComponent implements OnInit {
  readonly text = APP_TEXT.USER_PROFILE;

  readonly profile = signal<UserProfile | null>(null);
  readonly statusMessage = signal<string | null>(null);
  readonly isSaving = signal(false);

  constructor(
    private readonly profileService: UserProfileService,
    private readonly session: SessionService,
  ) {}

  ngOnInit(): void {
    const user = this.session.currentUser();
    if (!user) {
      return;
    }

    this.profileService.getProfile(user.uuid).subscribe({
      next: (profile) => this.profile.set(profile),
      error: () => this.profile.set({ uuid: user.uuid, username: user.username }),
    });
  }

  updateField<K extends keyof UserProfile>(field: K, value: UserProfile[K]): void {
    const current = this.profile();
    if (!current) {
      return;
    }
    this.profile.set({ ...current, [field]: value });
  }

  save(): void {
    const profile = this.profile();
    if (!profile) {
      return;
    }

    this.isSaving.set(true);
    this.profileService.updateProfile(profile.uuid, profile).subscribe({
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
