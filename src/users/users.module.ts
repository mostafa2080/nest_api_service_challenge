import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '../entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ThrottlerModule.forRoot([
      {
        ttl: 6000,
        limit: 5,
      },
    ]),
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
