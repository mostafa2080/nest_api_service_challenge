import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string = process.env.JWT_SECRET;

  constructor(private usersService: UserService) {}

  async signUp(email: string, password: string, name: string): Promise<any> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.generateToken(newUser.id, newUser.email);

    const { password: _, ...result } = newUser;

    return {
      ...result,
      accessToken: token,
    };
  }
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.email);
    const { password, ...result } = user;

    return {
      ...result,
      accessToken: token,
    };
  }

  private generateToken(userId: number, userEmail: string): string {
    const payload = { userId, userEmail };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      // console.log(decoded);
      const user = await this.usersService.findOne(decoded['userId']);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
