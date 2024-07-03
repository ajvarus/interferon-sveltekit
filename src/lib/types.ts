// src/lib/types.ts

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthRequest {
  auth_type: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  status_code?: number;
  msg?: string;
  user_id?: string;
}
