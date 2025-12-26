export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  accountBalance: number;
  currency: string;
  accountNumber: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}
