export interface LampStatus {
  status: "On" | "Off";
  id: string;
  alias: string;
  pending?: boolean;
}

export interface SensorStatus {
  status: "On" | "Off";
  id: string;
  alias: string;
  pending?: boolean;
}
