import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  NotFoundException,
  UseGuards,
  Patch,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '../entities';
import { PasswordChangeDto, UserProfileDto, UserRegistrationDto } from './dtos';
import { AuthGuard } from '../guards/jwt-auth.guard';
import { OwnerGuard } from 'src/guards/owner.guard';

UsePipes(new ValidationPipe());
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, OwnerGuard)
  async findOne(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  @Post()
  async create(@Body() user: UserRegistrationDto): Promise<User> {
    return await this.userService.create(user);
  }

  @Patch('profile/:id')
  @UseGuards(AuthGuard, OwnerGuard)
  async updateProfile(
    @Param('id') id: string,
    @Body() updatedProfile: UserProfileDto,
  ): Promise<User> {
    const userId = parseInt(id, 10);
    const user = await this.userService.update(userId, updatedProfile);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user;
  }

  @Patch('change-password/:id')
  @UseGuards(AuthGuard, OwnerGuard)
  async changePassword(
    @Param('id') id: string,
    @Body() passwordChangeDto: PasswordChangeDto,
  ): Promise<void> {
    const userId = parseInt(id, 10);
    // console.log(passwordChangeDto);
    await this.userService.changePassword(
      userId,
      passwordChangeDto.currentPassword,
      passwordChangeDto.newPassword,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard, OwnerGuard)
  async remove(@Param('id') id: string): Promise<void> {
    const userId = parseInt(id, 10);
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.userService.remove(userId);
  }
}
