// src/usecase/interfaces/AdminUseCase.ts
export interface AdminUseCase {
  login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string } | null>;
}
