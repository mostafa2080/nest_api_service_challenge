import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserProfileDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
