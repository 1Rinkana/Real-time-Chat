import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChatButtonComponent } from './components/chat-button/chat-button.component';
import { MessageBubbleComponent } from './components/message-bubble/message-bubble.component';
import { UserListItemComponent } from './components/user-list-item/user-list-item.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [ChatButtonComponent, MessageBubbleComponent, UserListItemComponent, NavBarComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ChatButtonComponent,
    MessageBubbleComponent,
    UserListItemComponent,
    NavBarComponent,
  ],
})
export class SharedModule {}
