import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  private API_URL = 'http://localhost:3333';

  constructor(private http: HttpClient) { }

  deleteEquipment(equipmentId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${equipmentId}`);
  }
}