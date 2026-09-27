import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';

@NgModule({
  declarations: [RegistrationPageComponent],
  imports: [SharedModule, RegistrationRoutingModule],
})
export class RegistrationModule {}
