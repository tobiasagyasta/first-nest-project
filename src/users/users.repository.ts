import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  private readonly users: User[] = [];
  private nextId = 1;

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      id: this.nextId++,
      ...createUserDto,
    };

    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByName(name: string): User | undefined {
    const normalizedName = name.trim().toLowerCase();

    return this.users.find(
      (user) => user.name.trim().toLowerCase() === normalizedName,
    );
  }

  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    const user = this.findOne(id);

    if (!user) {
      return undefined;
    }

    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      return undefined;
    }

    const [deletedUser] = this.users.splice(index, 1);
    return deletedUser;
  }
}
