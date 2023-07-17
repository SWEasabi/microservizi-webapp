/**
 * Rappresenta lo stato di una lampada.
 * Il campo `status` può essere 'On' (acceso) o 'Off' (spento).
 * Il campo `id` è un identificatore univoco per la lampada.
 * Il campo `alias` è un nome amichevole per la lampada.
 * Il campo `pending` è un campo opzionale che indica se il cambio di stato della lampada è in corso o meno.
 */
export interface LampStatus {
  /**
   * Lo stato corrente della lampada.
   * Può essere 'On' (acceso) o 'Off' (spento).
   */
  status: "On" | "Off";
  /**
   * L'identificatore univoco della lampada.
   */
  id: string;
  /**
   * Alias della lampada.
   */
  alias: string;
  /**
   * (Opzionale) Indica se il cambio di stato della lampada è in corso o meno.
   */
  pending?: boolean;
}

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
   * Alias del sensore.
   */
  alias: string;
  /**
   * (Opzionale) Indica se il cambio di stato del sensore è in corso o meno.
   */
  pending?: boolean;
  /**
   * La posizione geografica del sensore.
   */
  geoPos: string;
  /**
   * Il raggio entro cui il sensore opera.
   */
  actionRange: string;
}

/**
 * Rappresenta lo stato di un'area.
 * Il campo `status` può essere 'On' (attivata) o 'Off' (disattivata).
 * Il campo `id` è un identificatore univoco per l'area.
 * Il campo `alias` è un nome amichevole per l'area.
 */
export interface AreaStatus {
  /**
   * Lo stato corrente dell'area.
   * Può essere 'On' (attivata) o 'Off' (disattivata).
   */
  status: "On" | "Off";
  /**
   * L'identificatore univoco dell'area.
   */
  id: string;
  /**
   * Alias dell'area.
   */
  alias: string;
}
