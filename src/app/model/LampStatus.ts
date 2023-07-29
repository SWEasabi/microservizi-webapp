/**
 * Rappresenta lo stato di una lampada.
 * Il campo `status` può essere 'On' (acceso) o 'Off' (spento).
 * Il campo `id` è un identificatore univoco per la lampada.
 * Il campo `alias` è un nome amichevole per la lampada.
 * Il campo `pending` è un campo opzionale che indica se il cambio di stato della lampada è in corso o meno.
 */
export interface LampStatus {
    /**
     * L'identificatore univoco della lampada.
     */
    id: string;
    /**
     * L'identificatore univoco dell'area di appartenenza del lampione.
     */
    idarea: string;
    /**
     * (Opzionale) Indica se il cambio di stato della lampada è in corso o meno.
     */
    pending?: boolean;
    /**
     * La latitudine del lampione.
     */
    latitudine: number;
    /**
     * La longitudine del lampione.
     */
    longitudine: number;
    /**
     * Il voltaggio della lampada.
     */
    voltaggio: number;
}