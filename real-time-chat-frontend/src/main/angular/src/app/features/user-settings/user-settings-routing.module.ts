import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [{ path: '', component: UserSettingsPageComponent, canActivate: [authGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSettingsRoutingModule {}
