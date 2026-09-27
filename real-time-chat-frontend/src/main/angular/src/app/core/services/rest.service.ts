import { Observable } from 'rxjs';
import { HttpService, QueryParams } from './http.service';

export abstract class RestService<T> {
  protected constructor(
    protected readonly http: HttpService,
    protected readonly resourcePath: string,
  ) {}

  getAll(params?: QueryParams): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath, params);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.resourcePath}/${id}`);
  }

  create(payload: Partial<T>): Observable<T> {
    return this.http.post<T>(this.resourcePath, payload);
  }

  update(id: string, payload: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.resourcePath}/${id}`, payload);
  }

  patch(id: string, payload: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.resourcePath}/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath}/${id}`);
  }
}
