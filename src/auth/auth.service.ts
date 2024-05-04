import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../entities/user.entity';
import { AuthEntity } from '../entities/auth.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signUp(user: User): Promise<Omit<User, 'password'>> {
    user.uuid = uuidv4();
    user.password = await bcrypt.hash(user.password, 12);
    return await this.userService.createOne(user);
  }

  async signIn(auth: AuthEntity): Promise<string> {
    const user = await this.userService.findOneByEmail(auth.email);
    if (!user || !(await bcrypt.compare(auth.password, user.password))) {
      throw new BadRequestException(
        'Correo electrónico o contraseña incorrectos.',
        'auth/invalid-credentials.',
      );
    }

    return await this.jwtService.signAsync({
      email: user.email,
      uuid: user.uuid,
      role: user.role,
    });
  }

  async updateEmail(oldEmail: string, newEmail: string) {
    const user = await this.userService.findOneByEmail(oldEmail);
    await this.userService.validateNotExistEmail(newEmail);

    user.email = newEmail
    await this.userService.updateUser(user);

    return 'Email actualizado con éxito.'
  }

  async updatePassword(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    const exist = !!user;

    if (!exist) {
      throw new NotFoundException(
        'No se encontró al usuario con el UUID proporcionado.',
        'auth/user-not-found',
      );
    }

    user.password = await bcrypt.hash(password, 12);
    await this.userService.updateUser(user);

    return 'Contraseña actualizada con éxito.'
  }
}
