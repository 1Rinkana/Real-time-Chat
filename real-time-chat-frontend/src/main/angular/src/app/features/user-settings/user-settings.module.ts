import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { UserSettingsPageComponent } from './pages/user-settings-page/user-settings-page.component';

@NgModule({
  declarations: [UserSettingsPageComponent],
  imports: [SharedModule, UserSettingsRoutingModule],
})
export class UserSettingsModule {}
