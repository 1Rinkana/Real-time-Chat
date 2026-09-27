import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';

@NgModule({
  declarations: [UserProfilePageComponent],
  imports: [SharedModule, UserProfileRoutingModule],
})
export class UserProfileModule {}
