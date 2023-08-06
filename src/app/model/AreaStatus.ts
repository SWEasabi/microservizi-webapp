/**
 * Rappresenta lo stato di un'area.
 * Il campo `status` può essere 'On' (attivata) o 'Off' (disattivata).
 * Il campo `id` è un identificatore univoco per l'area.
 * Il campo `alias` è un nome amichevole per l'area.
 */
export interface AreaStatus {
    /**
     * La modalita' autoMode dell'area.
     * Può essere 'On' (attivata) o 'Off' (disattivata).
     */
    autoMode: "On" | "Off";
    /**
     * L'identificatore univoco dell'area.
     */
    id: string;
    /**
     * Alias dell'area.
     */
    nome: string;
    /*
    Dice se l'area è in modalità automatica o meno
    */ 
    automode: boolean;
    /**
     * Il livello inferiore dell'area.
     */
    lvlInf: number;
    /**
     * Il livello superiore dell'area.
     */
    lvlSup: number;
  }
  