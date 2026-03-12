import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = this.usersRepository.findByName(createUserDto.name);

    if (existingUser) {
      throw new ConflictException(
        `Username "${createUserDto.name}" is already taken`,
      );
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll(): User[] {
    return this.usersRepository.findAll();
  }

  findOne(id: number): User {
    const user = this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedData: UpdateUserDto = { ...updateUserDto };

    if (updatedData.password !== undefined) {
      updatedData.password = await hash(updatedData.password, 10);
    }

    const updatedUser = this.usersRepository.update(id, updatedData);

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  remove(id: number): User {
    const user = this.usersRepository.remove(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
