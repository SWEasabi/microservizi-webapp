/**
 * Rappresenta lo stato di un sensore.
 * Il campo `status` può essere 'On' (attivato) o 'Off' (disattivato).
 * Il campo `id` è un identificatore univoco per il sensore.
 * Il campo `alias` è un nome amichevole per il sensore.
 * Il campo `pending` è un campo opzionale che indica se il cambio di stato del sensore è in corso o meno.
 * Il campo `geoPos` rappresenta la posizione geografica del sensore.
 * Il campo `actionRange` indica il raggio entro cui il sensore opera.
 */
export interface SensorStatus {
    /**
     * Lo stato corrente del sensore.
     * Può essere 'On' (attivato) o 'Off' (disattivato).
     */
    status: "On" | "Off";
    /**
     * L'identificatore univoco del sensore.
     */
    id: string;
    /**
     * L'identificatore univoco dell'area di appartenenza del lampione.
     */
    idarea: string;
    /**
     * Alias del sensore.
  
    alias: string;*/
    /**
     * (Opzionale) Indica se il cambio di stato del sensore è in corso o meno.
     */
    pending?: boolean;
    /**
     * La latitudine del sensore.
     */
    latitudine: number;
    /**
     * La longitudine del sensore.
     */
    longitudine: number;
    /**
     * Il raggio entro cui il sensore opera.
     */
    raggio: number;
  
  }