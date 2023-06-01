import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LampStatus } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http:HttpClient) {}
  
  getAllLamps$(){
    return this.http.get<LampStatus[]>(`/lamps`);
  }

  toggleLamp$(lampId: LampStatus["id"], newStatus: LampStatus["status"]) {
    return this.http.put<string>(`/lamps/${lampId}/switch/${newStatus}`, null);
  }
  addLamp$ (alias: string) {
    return this.http.post<LampStatus>('/lamps', { alias });
  }
}

