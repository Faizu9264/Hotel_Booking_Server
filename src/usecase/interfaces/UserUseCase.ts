import { UserDocument } from '../../domain/entities/User'; // Adjust the import statement

export interface UserUseCase {
  signUp(user: UserDocument): Promise<string>;
  login(username: string, password: string): Promise<string | null>;
}