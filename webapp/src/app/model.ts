export interface LampStatus {
  status: "On" | "Off";
  id: string;
  alias: string;
  pending?: boolean;
}
