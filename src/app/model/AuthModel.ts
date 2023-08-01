export interface LoginResult {
  status: boolean;
  access: string;
  refresh: string
}

export interface LogoutInput {
  refresh: string;
}

export interface LogoutResult {
  status: boolean;
}
