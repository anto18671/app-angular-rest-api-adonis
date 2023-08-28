import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../component/app.component';

export interface ApplianceResponse {
  id: number;
  uid: string;
  brand: string;
  equipment: string;
}


@Injectable({
  providedIn: 'root'
})

export class EquipmentDialogService {

  private API_URL = 'http://localhost:3333';
  private randomApiURL = 'https://random-data-api.com/api/v2/appliances?size=1';

  constructor(private http: HttpClient) {}

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.API_URL}/add`, equipment);
  }

  editEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(`${this.API_URL}/edit`, equipment);
  }

  getRandomData(): Observable<ApplianceResponse> {
    return this.http.get<ApplianceResponse>(this.randomApiURL);
  }
}