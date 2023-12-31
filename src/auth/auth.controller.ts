import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserRegistrationDto } from 'src/users/dtos';

UsePipes(new ValidationPipe());
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() userRegistration: UserRegistrationDto): Promise<any> {
    return this.authService.signUp(
      userRegistration.email,
      userRegistration.password,
      userRegistration.name,
    );
  }

  @Post('/signin')
  async signIn(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.signIn(userLoginDto.email, userLoginDto.password);
  }
}
