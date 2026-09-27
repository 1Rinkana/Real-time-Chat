import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { ChatMessage } from '../../../core/models/message.model';

/**
 * REST-seitiger Service der Chat-Page. Die Live-Kommunikation läuft über
 * ChatWebsocketService; dieser Service ist der Anknüpfungspunkt für
 * zukünftige HTTP-Endpunkte, z. B. Volltextsuche in der Chat-Historie.
 */
@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private readonly http: HttpService) {}

  searchMessages(query: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>('/chat/search', { query });
  }
}
