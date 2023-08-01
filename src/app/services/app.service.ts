/**
 * Il servizio principale per la gestione dello stato dell'applicazione.
 * Gestisce le operazioni relative alle lampade, ai sensori e alle aree,
 * compresa la lettura dei dati dall'API, la gestione degli errori e l'aggiornamento dello stato.
 */

import { HttpStatusCode } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, catchError, delay, map, Observable, of, switchMap, tap } from "rxjs";
import { LampStatus } from "../model/LampStatus";
import { SensorStatus } from "../model/SensorStatus";
import { Area, AreaStatus } from "../model/AreaStatus";
import { ApiService } from "./api.service";

/**
 * Interfaccia che rappresenta lo store dello stato dell'applicazione.
 * Contiene array di lampade, sensori e aree,
 * inoltre si interessa di segnalare se i dati sono attualmente in caricamento o se si tratta del primo caricamento.
 */
interface Store {
  /**
   * Un array di stati delle lampade che rappresentano lo stato delle lampade nell'applicazione.
   */
  lamps: LampStatus[];
  /**
   * Un array di stati dei sensori che rappresentano lo stato dei sensori nell'applicazione.
   */
  sensors: SensorStatus[];
  /**
   * Un array di stati delle aree che rappresentano lo stato delle aree nell'applicazione.
   */
  areas: AreaStatus[];
  /**
   * Un indicatore che segnala se i dati sono attualmente in caricamento o ottenuti dall'API.
   */
  loading: boolean;
  /**
   * Un indicatore che segnala se si tratta del primo caricamento dei dati.
   */
  firstLoad: boolean;
  /**
   * Una stringa che rappresenta un messaggio di errore in caso di errori.
   */
  error: string;
}


/**
 * Stato iniziale per lo store dell'applicazione.
 * Contiene array vuoti per lampade, sensori e aree,
 * e imposta a false gli indicatori di caricamento e primo caricamento.
 */
const initialState: Store = {
  lamps: [],
  sensors: [],
  areas: [],
  loading: false,
  firstLoad: true,
  error: null
};

/**
 * Il servizio principale per la gestione dello stato dell'applicazione.
 * Gestisce le operazioni relative alle lampade, ai sensori e alle aree,
 * compresa la lettura dei dati dall'API, la gestione degli errori e l'aggiornamento dello stato.
 */
@Injectable({
  providedIn: "root"
})

export class AppService {

  /**
   * Inietta ApiService.
   */
  api = inject(ApiService);

  /**
   * Definisce lo store principale dello stato dell'applicazione come BehaviorSubject.
   * Si tratta di un Subject RxJS che può emettere nuovi valori ai suoi sottoscrittori
   * e ha la caratteristica di restituire sempre l'ultimo valore emesso ai nuovi sottoscrittori.
   * Viene inizializzato qui con uno stato iniziale.
   */

  $store = new BehaviorSubject<Store>(initialState);
  /**
     * Definisce selettori per diverse parti dello state.
     */
  readonly lamps$ = this.$store.pipe(map(state => state.lamps));
  readonly sensors$ = this.$store.pipe(map(state => state.sensors));
  readonly areas$ = this.$store.pipe(map(state => state.areas));
  readonly error$ = this.$store.pipe(map(state => state.error));
  readonly loading$ = this.$store.pipe(map(state => state.loading), delay(0));
  readonly firstLoad$ = this.$store.pipe(map(state => state.firstLoad));

  /**
 * Carica i dati delle lampade dall'API.
 * Aggiorna lo stato con i nuovi dati, gestisce eventuali errori,
 * e interrompe l'animazione di caricamento una volta completato.
 */
public loadLampsData (areaId: number) {
  // Avvia l'animazione di caricamento.
  this.startLoading();

  // Chiama il metodo getAllLamps$() del servizio api per ottenere i dati delle lampade.
  // Questo metodo restituisce un Observable che emette i dati delle lampade.
  (areaId ? this.api.getAllLampsByAreaId$(areaId) : this.api.getAllLamps$()).subscribe({
    // Callback "next": Eseguita quando nuovi dati (lampade) sono emessi dall'Observable.
    next: (lamps) => {
      // Aggiorna lo stato dell'applicazione con i nuovi dati utilizzando this.$store.next(...).
      // Viene creato un nuovo oggetto di stato tramite il spreading dello stato esistente (this.$store.value)
      // e sostituendo la proprietà "lamps" con i nuovi dati ("lamps").
      // Imposta anche la proprietà "firstLoad" a "false" per indicare che non è il primo caricamento.
      this.$store.next({
        ...this.$store.value,
        lamps,
        firstLoad: false
      });
    },
    // Callback "error": Eseguita in caso di errore durante il recupero dei dati.
    error: (error) => {
      // Gestisce l'errore chiamando il metodo "manageError(error)".
      // Il metodo "manageError" aggiorna lo stato con un messaggio di errore appropriato
      // basato sul codice di stato HTTP dell'errore.
      // Successivamente, chiama "this.stopLoading()" per interrompere l'animazione di caricamento.
      this.manageError(error);
      this.stopLoading();
    },
    // Callback "complete": Eseguita quando l'Observable è completato,
    // indicando che il processo di caricamento dei dati è terminato (con successo o con un errore).
    complete: () => {
      // Chiama "this.stopLoading()" per interrompere l'animazione di caricamento.
      this.stopLoading();
    }
  });
}

  /**
     * Carica i dati dei sensori dall'API.
     * Aggiorna lo stato con i nuovi dati, gestisce eventuali errori,
     * e interrompe l'animazione di caricamento una volta completato.
     */
  public loadDataSensors(areaId?: number) {
    this.startLoading();
    (areaId ? this.api.getAllSensorsByAreaId$(areaId) : this.api.getAllSensors$()).subscribe({
        next: (sensors) => {
          this.$store.next({
            ...this.$store.value,
            sensors,
            firstLoad: false
          });
        },
        error: (error) => {
          this.manageError(error);
          this.stopLoading();
        },
        complete: () => {
          this.stopLoading();
        }
      });
  }
  /**
     * Carica i dati delle aree dall'API.
     * Aggiorna lo stato con i nuovi dati, gestisce eventuali errori,
     * e interrompe l'animazione di caricamento una volta completato.
     */
  public loadDataAreas() {
    this.startLoading();
    this.api.getAllAreas$()
      .subscribe({
        next: (areas) => {
          this.$store.next({
            ...this.$store.value,
            areas,
            firstLoad: false
          });
        },
        error: (error) => {
          this.manageError(error);
          this.stopLoading();
        },
        complete: () => {
          this.stopLoading();
        }
      });
  }


  /**
 * Avvia l'animazione di caricamento.
 */
private startLoading() {
  // Aggiorna lo stato dell'applicazione per indicare che il caricamento dei dati è in corso.
  // Viene creato un nuovo oggetto di stato tramite lo spreading dello stato esistente (this.$store.value)
  // e impostando la proprietà "loading" a "true".
  this.$store.next({
    ...this.$store.value,
    loading: true
  });
}

  /**
     * Interrompe l'animazione di caricamento.
     */
  private stopLoading() {
    this.$store.next({
      ...this.$store.value,
      loading: false
    });
  }
  /**
     * Aggiorna lo stato di una lampada come in attesa.
     * Questo viene utilizzato per mostrare che lo stato di una lampada sta cambiando.
     */
  private setLampPending(lamp: LampStatus, pending: boolean) {
    this.$store.next({
      ...this.$store.value,
      lamps: this.$store.value.lamps.map(l => l.id === lamp.id ? { ...l, pending } : l)
    });
  }
  /**
     * Inverte lo stato di una lampada.
     * Chiama l'API per aggiornare lo stato della lampada,
     * quindi ricarica i dati delle lampade per riflettere le modifiche.
  public toggleLamp(lamp: LampStatus) {
    this.setLampPending(lamp, true);
    this.api.toggleLamp$(lamp.id, lamp.status === "On" ? "Off" : "On")
      .subscribe({
        next: () => this.loadData()
      });
  }
     */


  /**
     * Gestisce gli errori.
     * Aggiorna lo stato con un messaggio di errore appropriato in base al codice di stato HTTP.
     */

  private manageError(error: any) {
    if (error.status === HttpStatusCode.NotFound) {
      this.$store.next({
        ...this.$store.value,
        error: "Non trovato"
      });
    } else {
      this.$store.next({
        ...this.$store.value,
        error: "Errore"
      });
    }
  }
  /**
  * Aggiunge una nuova lampada con l'alias fornito.
  * Avvia l'animazione di caricamento, chiama l'API per aggiungere la lampada,
  * quindi interrompe l'animazione di caricamento e ricarica i dati delle lampade.
  * @param alias L'alias della nuova lampada.
  * @returns Un osservabile che emette un valore booleano che indica se l'aggiunta della lampada è stata eseguita con successo.
  */
  public addLamp$(alias: string): Observable<boolean> {
    return of(true)
      .pipe(
        tap(() => this.startLoading()),
        switchMap(() => this.api.addLamp$(alias)),
        map(() => true),
        catchError(() => of(false)),
        tap(() => this.loadLampsData (null))
      );
  }
  /**
   * Aggiunge un nuovo sensore con l'alias, la posizione geografica e l'azione forniti.
   * Avvia l'animazione di caricamento, chiama l'API per aggiungere il sensore,
   * quindi interrompe l'animazione di caricamento e ricarica i dati dei sensori.
   * @param alias L'alias del nuovo sensore.
   * @param latitudine La posizione geografica del nuovo sensore.
   * @param actionRange L'azione del nuovo sensore.
   * @returns Un osservabile che emette un valore booleano che indica se l'aggiunta del sensore è stata eseguita con successo.
   */

  public addSensor$(alias: number, latitudine: number, longitudine: number, raggio: number): Observable<boolean> {
    return of(true)
      .pipe(
        tap(() => this.startLoading()),
        switchMap(() => this.api.addSensor$(alias, latitudine, longitudine, raggio)),
        map(() => true),
        catchError(() => of(false)),
        tap(() => this.loadLampsData (null))
      );
  }
  /**
 * Aggiunge una nuova area con l'alias fornito.
 * Avvia l'animazione di caricamento, chiama l'API per aggiungere l'area,
 * quindi interrompe l'animazione di caricamento e ricarica i dati delle aree.
 * @param alias L'alias della nuova area.
 * @returns Un osservabile che emette un valore booleano che indica se l'aggiunta dell'area è stata eseguita con successo.
 */
  public addArea$(area: Area): Observable<boolean> {
    return of(true)
      .pipe(
        tap(() => {
          this.startLoading()
        }),
        switchMap(() => this.api.addArea$(area)),
        map(() => true),
        catchError(() => of(false)),
        tap(() => this.loadDataAreas())
      );
  }

}
