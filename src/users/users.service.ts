import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { UserRegistrationDto } from './dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(user: UserRegistrationDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async update(
    id: number,
    updatedUser: Partial<User>,
  ): Promise<User | undefined> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    if (updatedUser.email && updatedUser.email !== existingUser.email) {
      const existingEmailUser = await this.findByEmail(updatedUser.email);
      if (existingEmailUser) {
        throw new BadRequestException('Email is already in use');
      }
    }

    await this.userRepository.update(id, updatedUser);
    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    await this.userRepository.delete(id);
  }

  async changePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const isCurrentPasswordValid = await existingUser.comparePassword(
      currentPassword,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.userRepository.update(id, {
      password: hashedNewPassword,
    });
  }
}
