import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AppSettingsRoutingModule } from './app-settings-routing.module';
import { AppSettingsPageComponent } from './pages/app-settings-page/app-settings-page.component';

@NgModule({
  declarations: [AppSettingsPageComponent],
  imports: [SharedModule, AppSettingsRoutingModule],
})
export class AppSettingsModule {}
