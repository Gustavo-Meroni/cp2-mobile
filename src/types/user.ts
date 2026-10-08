export type UserRole = 'admin' | 'user';
export type Treatment = 'Sr.' | 'Sra.' | 'Srta.';

export interface User {
  id: number;
  username: string;
  role: UserRole;
  name: string;
}
