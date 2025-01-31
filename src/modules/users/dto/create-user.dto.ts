export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status?: 'avtice' | 'inactive';
  gender?: 'male' | 'female';
  role?: 'normal' | 'admin' | 'gold';
}
