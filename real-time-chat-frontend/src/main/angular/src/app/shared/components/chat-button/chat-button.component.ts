import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Wiederverwendbarer Button für Chat-Ziele (öffentlicher Chat, einzelner User).
 * Wird sowohl für den "Public chat"-Button als auch für Einträge
 * in der User-Liste verwendet.
 */
@Component({
  selector: 'app-chat-button',
  standalone: false,
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.scss',
})
export class ChatButtonComponent {
  @Input({ required: true }) label = '';
  @Input() selected = false;
  @Input() unreadCount = 0;

  @Output() readonly selectChat = new EventEmitter<void>();

  onClick(): void {
    this.selectChat.emit();
  }
}
