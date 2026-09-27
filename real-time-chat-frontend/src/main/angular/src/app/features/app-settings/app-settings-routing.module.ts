import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSettingsPageComponent } from './pages/app-settings-page/app-settings-page.component';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [{ path: '', component: AppSettingsPageComponent, canActivate: [authGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSettingsRoutingModule {}
