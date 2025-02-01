import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(['avtice', 'inactive'])
  @IsOptional()
  status?: 'avtice' | 'inactive';

  @IsEnum(['male', 'female'])
  @IsOptional()
  gender?: 'male' | 'female';

  @IsEnum(['normal', 'admin', 'gold'])
  @IsOptional()
  role?: 'normal' | 'admin' | 'gold';

  @IsString()
  @IsOptional()
  hashed_refresh?: string;
}
