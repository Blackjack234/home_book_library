import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { registerDto } from './dto/register.dto.';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(
    registerDto: registerDto,
  ): Promise<{ message: string; User: User; token: string }> {
    try {
      const { name, email, password, address, gender, phone } = registerDto;

      const hashPassword = await bcrypt.hash(password, 10);
      const user = await this.UserModel.create({
        name,
        email,
        phone,
        address,
        gender,
        password: hashPassword,
      });

      const token = this.jwtService.sign({ id: user._id });

      return { message: 'registration successful', User: user, token: token };
    } catch (e) {
      throw new Error(`something went wrong ${e?.message}`);
    }
  }
}
