import { IsNotEmpty, MinLength } from 'class-validator';

export class PasswordChangeDto {
  @IsNotEmpty()
  @MinLength(6)
  currentPassword: string;

  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
