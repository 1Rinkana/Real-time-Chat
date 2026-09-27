import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

@NgModule({
  declarations: [ChatPageComponent],
  imports: [SharedModule, ChatRoutingModule],
})
export class ChatModule {}
