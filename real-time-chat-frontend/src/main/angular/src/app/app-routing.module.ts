import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chat' },
  {
    path: 'registration',
    loadChildren: () => import('./features/registration/registration.module').then((m) => m.RegistrationModule),
  },
  {
    path: 'chat',
    loadChildren: () => import('./features/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/user-profile/user-profile.module').then((m) => m.UserProfileModule),
  },
  {
    path: 'user-settings',
    loadChildren: () =>
      import('./features/user-settings/user-settings.module').then((m) => m.UserSettingsModule),
  },
  {
    path: 'app-settings',
    loadChildren: () =>
      import('./features/app-settings/app-settings.module').then((m) => m.AppSettingsModule),
  },
  { path: '**', redirectTo: 'chat' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
