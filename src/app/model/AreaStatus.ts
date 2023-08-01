export interface Area {
    /**
     * Alias dell'area.
     */
    nome: string | null;
    /*
     Dice se l'area è in modalità automatica o meno
     */
    automode: boolean | null;
    /**
     * Il livello inferiore dell'area.
     */
    lvlInf: number | null;
    /**
     * Il livello superiore dell'area.
     */
    lvlSup: number | null;
}

/**
 * Rappresenta lo stato di un'area.
 * Il campo `status` può essere 'On' (attivata) o 'Off' (disattivata).
 * Il campo `id` è un identificatore univoco per l'area.
 * Il campo `alias` è un nome amichevole per l'area.
 */
export interface AreaStatus extends Area {
    /**
     * La modalita' autoMode dell'area.
     * Può essere 'On' (attivata) o 'Off' (disattivata).
     */
    autoMode: "On" | "Off";
    /**
     * L'identificatore univoco dell'area.
     */
    id: string;
  }
