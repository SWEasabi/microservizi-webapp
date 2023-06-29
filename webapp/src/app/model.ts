/**
 * Represents the status of a lamp.
 * The `status` field can be 'On' or 'Off'.
 * The `id` field is a unique identifier for the lamp.
 * The `alias` field is a friendly name for the lamp.
 * The `pending` field is an optional field that denotes whether a lamp's status change is in progress or not.
 */
export interface LampStatus {
  /**
   * The current status of the lamp.
   * Can be either 'On' or 'Off'.
   */
  status: "On" | "Off";
  /**
   * The unique identifier of the lamp.
   */
  id: string;
  /**
   * The friendly name of the lamp.
   */
  alias: string;
  /**
   * (Optional) Denotes whether a lamp's status change is in progress or not.
   */
  pending?: boolean;
}

/**
 * Represents the status of a sensor.
 * The `status` field can be 'On' or 'Off'.
 * The `id` field is a unique identifier for the sensor.
 * The `alias` field is a friendly name for the sensor.
 * The `pending` field is an optional field that denotes whether a sensor's status change is in progress or not.
 * The `geoPos` field represents the geographic position of the sensor.
 * The `actionRange` field indicates the range within which the sensor operates.
 */
export interface SensorStatus {
  /**
   * The current status of the sensor.
   * Can be either 'On' or 'Off'.
   */
  status: "On" | "Off";
  /**
   * The unique identifier of the sensor.
   */
  id: string;
  /**
   * The friendly name of the sensor.
   */
  alias: string;
  /**
   * (Optional) Denotes whether a sensor's status change is in progress or not.
   */
  pending?: boolean;
  /**
   * The geographic position of the sensor.
   */
  geoPos: string;
  /**
   * The range within which the sensor operates.
   */
  actionRange: string;
}

/**
 * Represents the status of an area.
 * The `status` field can be 'On' or 'Off'.
 * The `id` field is a unique identifier for the area.
 * The `alias` field is a friendly name for the area.
 */
export interface AreaStatus {
  /**
   * The current status of the area.
   * Can be either 'On' or 'Off'.
   */
  status: "On" | "Off";
  /**
   * The unique identifier of the area.
   */
  id: string;
  /**
   * The friendly name of the area.
   */
  alias: string;
}
