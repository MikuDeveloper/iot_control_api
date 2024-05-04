import { Body, Controller, Post, Put } from "@nestjs/common";
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { AuthEntity } from '../entities/auth.entity';
import { UpdateEmailEntity } from '../entities/update-email.entity';
import { UpdatePasswordEntity } from '../entities/update-password.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User): Promise<Omit<User, 'password'>> {
    return await this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() credentials: AuthEntity): Promise<string> {
    return await this.authService.signIn(credentials);
  }

  @Put('update-email')
  async updateEmail(@Body() update: UpdateEmailEntity): Promise<string> {
    return await this.authService.updateEmail(update.oldEmail, update.newEmail);
  }

  @Put('update-password')
  async updatePassword(@Body() credentials: UpdatePasswordEntity) {
    return await this.authService
      .updatePassword(credentials.email, credentials.password);
  }
}
