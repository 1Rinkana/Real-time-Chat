import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../../core/models/message.model';

@Component({
  selector: 'app-message-bubble',
  standalone: false,
  templateUrl: './message-bubble.component.html',
  styleUrl: './message-bubble.component.scss',
})
export class MessageBubbleComponent {
  @Input({ required: true }) message!: ChatMessage;

  get formattedDate(): string {
    const date = new Date(this.message.sentAt);
    return `${date.toLocaleDateString('de-DE')} ${date.toLocaleTimeString('de-DE')}`;
  }
}
