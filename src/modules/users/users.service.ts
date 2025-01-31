import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    let user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user)
      throw new BadRequestException('The provided email already registered.');

    const password = await bcrypt.hash(createUserDto.password, 10);

    user = this.userRepository.create({ ...createUserDto, password });
    const createdUser = await this.userRepository.save(user);

    const { password: pass, ...rest } = createdUser;
    return rest;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ user_id: id });
    if (!user) throw new NotFoundException('User with the given ID not found.');

    return user;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    let user = await this.findOne(id);
    if (!user) throw new NotFoundException('User with the given ID not found.');

    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

    await this.userRepository.update({ user_id: id }, { ...updateUserDto });
    const { password, ...updatedUser } = await this.findOne(id);

    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const user = this.findOne(id);
    if (!user) throw new NotFoundException('User with the given ID not found.');

    await this.userRepository.delete({ user_id: id });

    return user;
  }
}
