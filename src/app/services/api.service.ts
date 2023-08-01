import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LampStatus } from '../model/LampStatus';
import { SensorStatus } from '../model/SensorStatus';
import { Area, AreaStatus } from "../model/AreaStatus";
import { PATHS } from '../app.constant';

/**
 * Servizio per effettuare richieste API relative a lampade, sensori e aree.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * Costruisce l'ApiService con l'iniezione della dipendenza HttpClient.
   * @param http L'istanza HttpClient utilizzata per effettuare richieste HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Recupera tutte le lampade dall'API.
   * @returns Un osservabile di tipo LampStatus[] che rappresenta l'elenco delle lampade.
   */
  getAllLamps$() {
    return this.http.get<LampStatus[]>(PATHS.LAMP_PATH + "/allLamps");
  }

  getAllLampsByAreaId$(areaId: number) {
    return this.http.get<LampStatus[]>(PATHS.LAMP_PATH + "/LampsInArea/" + areaId);
  }

  /**
   * Recupera tutti i sensori dall'API.
   * @returns Un osservabile di tipo SensorStatus[] che rappresenta l'elenco dei sensori.
   */
  getAllSensors$() {
    return this.http.get<SensorStatus[]>(PATHS.SENSOR_PATH + `/allSensors`);
  }

  getAllSensorsByAreaId$(areaId: number) {
    return this.http.get<SensorStatus[]>(PATHS.SENSOR_PATH + "/sensorsInArea/" + areaId);
  }

  /**
   * Recupera tutte le aree dall'API.
   * @returns Un osservabile di tipo AreaStatus[] che rappresenta l'elenco delle aree.
   */
  getAllAreas$() {
    return this.http.get<AreaStatus[]>(PATHS.AREA_PATH + `/allAreas`);
  }

  /**
   * Aggiorna lo stato di una lampada nell'API.
   * @param lampId L'ID della lampada da aggiornare.
   * @param newStatus Il nuovo stato da impostare per la lampada.
   * @returns Un osservabile di tipo string che rappresenta il risultato dell'operazione di aggiornamento.

  toggleLamp$(lampId: LampStatus['id'], newStatus: LampStatus['status']) {
    return this.http.put<string>(`/lamps/${lampId}/switch/${newStatus}`, null);
  }
*/
  /**
   * Aggiunge una nuova lampada all'API.
   * @param alias L'alias della nuova lampada.
   * @returns Un osservabile di tipo LampStatus che rappresenta la lampada appena aggiunta.
   */
  addLamp$(alias: string) {
    return this.http.post<LampStatus>('/lamps', { alias });
  }

  /**
   * Aggiunge un nuovo sensore all'API.
   * @param idarea L'id dell'area del sensore
   * @param latitudine La posizione geografica del nuovo sensore.
   * @param actionRange Il raggio di azione del nuovo sensore.
   * @returns Un osservabile di tipo SensorStatus che rappresenta il sensore appena aggiunto.
   */
  addSensor$(idarea: number, latitudine: number, longitudine: number, raggio: number) {
    return this.http.put<SensorStatus>(PATHS.SENSOR_PATH + "/insert", { idarea, latitudine, longitudine, raggio });
  }

  /**
   * Aggiunge una nuova area all'API.
   * @param alias L'alias della nuova area.
   * @returns Un osservabile di tipo AreaStatus che rappresenta l'area appena aggiunta.
   */
  addArea$(area: Area) {
    return this.http.put<AreaStatus>(PATHS.AREA_PATH +'/save', area);
  }
}
