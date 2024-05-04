import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthorizationGuard } from '../guards/authorization/authorization.guard';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createOne(user: User): Promise<Omit<User, 'password'>> {
    await this.validateNotExistEmail(user.email);

    const resUser = await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = resUser;
    return result;
  }

  async findAll() {
    const users = await this.userRepository.find();
    const usersData: Omit<User, 'password'>[] = [];
    for (const user of users) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      usersData.push(result);
    }
    
    return usersData;
  }

  @UseGuards(AuthorizationGuard)
  async findOne(uuid: string) {
    const user = await this.validateExist(uuid);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findOneByEmail(email: string) {
    return await this.validateExistEmail(email);
  }

  async deleteOne(uuid: string): Promise<string> {
    await this.validateExist(uuid);
    await this.userRepository.delete(uuid);
    return `Usuario eliminado con el UUID: ${uuid}`;
  }

  async updateOne(uuid: string, data: any) {
    let user = await this.validateExist(uuid);

    for (const key in data) {
      if (!user.hasOwnProperty(key)) {
        throw new BadRequestException(
          `El campo '${key}' no es válido.`,
          'validation/invalid-field',
        );
      }
    }

    if ('email' in data) {
      throw new BadRequestException(
        `El campo 'email' no es válido en este contexto.`,
        'validation/invalid-field',
      );
    }

    if ('password' in data) {
      throw new BadRequestException(
        `El campo 'password' no es válido en este contexto.`,
        'validation/invalid-field',
      );
    }

    user = { ...user, ...data };
    const updatedUser = await this.userRepository.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = updatedUser;
    return result;
  }

  async updateUser(user: User) {
    await this.userRepository.save(user);
  }

  private async validateExist(uuid: string) {
    const user = await this.userRepository.findOneBy({ uuid });
    if (!user) {
      throw new BadRequestException(
        'No se encontró al usuario con el UUID proporcionado.',
        'auth/user-not-found',
      );
    }
    return user;
  }

  private async validateExistEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new BadRequestException(
        'No se encontró al usuario con el correo electrónico proporcionado.',
        'auth/user-not-found',
      );
    }
    return user;
  }

  async validateNotExistEmail(email: string) {
    const exist = !!(await this.userRepository.findOneBy({ email }));
    if (exist) {
      throw new BadRequestException(
        'Este email ya ha sido registrado.',
        'auth/email-already-in-use',
      );
    }
  }
}
