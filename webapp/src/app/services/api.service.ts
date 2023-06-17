import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LampStatus, SensorStatus , AreaStatus } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http:HttpClient) {}
  
  getAllLamps$(){
    return this.http.get<LampStatus[]>(`/lamps`);
  }
  getAllSensors$(){
    return this.http.get<SensorStatus[]>(`/sensors`);
  }
  getAllAreas$(){
    return this.http.get<AreaStatus[]>(`/areas`);
  }

  toggleLamp$(lampId: LampStatus["id"], newStatus: LampStatus["status"]) {
    return this.http.put<string>(`/lamps/${lampId}/switch/${newStatus}`, null);
  }
  addLamp$ (alias: string) {
    return this.http.post<LampStatus>('/lamps', { alias });
  }

  addSensor$ (alias: string , geoPos : string , actionRange : string) {
    return this.http.post<SensorStatus>('/sensors', { alias , geoPos , actionRange});
  }

  addArea$ (alias: string ) {
    return this.http.post<AreaStatus>('/areas', { alias });
  }
}

