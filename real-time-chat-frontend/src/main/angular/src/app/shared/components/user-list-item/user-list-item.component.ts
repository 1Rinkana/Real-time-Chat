import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list-item',
  standalone: false,
  templateUrl: './user-list-item.component.html',
  styleUrl: './user-list-item.component.scss',
})
export class UserListItemComponent {
  @Input({ required: true }) user!: User;
  @Input() selected = false;
  @Input() unreadCount = 0;

  @Output() readonly select = new EventEmitter<User>();

  onSelect(): void {
    this.select.emit(this.user);
  }
}
