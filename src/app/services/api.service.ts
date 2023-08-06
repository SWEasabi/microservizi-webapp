import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LampStatus } from '../model/LampStatus';
import { SensorStatus } from '../model/SensorStatus';
import { AreaStatus } from '../model/AreaStatus';
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
    return this.http.get<LampStatus[]>(PATHS.BASE_PATH + PATHS.LAMP_PATH + "/allLamps");
  }

  /**
   * Recupera tutti i sensori dall'API.
   * @returns Un osservabile di tipo SensorStatus[] che rappresenta l'elenco dei sensori.
   */
  getAllSensors$() {
    return this.http.get<SensorStatus[]>(PATHS.BASE_PATH + PATHS.SENSOR_PATH + `/allSensors`);
  }

  /**
   * Recupera tutte le aree dall'API.
   * @returns Un osservabile di tipo AreaStatus[] che rappresenta l'elenco delle aree.
   */
  getAllAreas$() {
    return this.http.get<AreaStatus[]>(PATHS.BASE_PATH + PATHS.AREA_PATH + `/allAreas`);
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
  addLamp$(idarea: number, latitudine: number, longitudine: number, tipo : string, wattaggio: number) {
    return this.http.put<LampStatus>(PATHS.BASE_PATH + PATHS.LAMP_PATH + "/insert", { idarea, latitudine, longitudine, tipo, wattaggio });
  }

  /**
   * Aggiunge un nuovo sensore all'API.
   * @param idarea L'id dell'area del sensore
   * @param latitudine La posizione geografica del nuovo sensore.
   * @param actionRange Il raggio di azione del nuovo sensore.
   * @returns Un osservabile di tipo SensorStatus che rappresenta il sensore appena aggiunto.
   */
  addSensor$(idarea: number, latitudine: number, longitudine: number, raggio: number) {
    return this.http.put<SensorStatus>(PATHS.BASE_PATH + PATHS.SENSOR_PATH + "/insert", { idarea, latitudine, longitudine, raggio });
  }

  /**
   * Aggiunge una nuova area all'API.
   * @param alias L'alias della nuova area.
   * @returns Un osservabile di tipo AreaStatus che rappresenta l'area appena aggiunta.
   */
  addArea$(alias: string) {
    return this.http.post<AreaStatus>('/areas', { alias });
  }

  setLuminosita(idlamp: number, value: number) {
    return this.http.post<boolean>('http://localhost:8083/setIlluminazione/' + idlamp + '/' + value, {});
  }
}
