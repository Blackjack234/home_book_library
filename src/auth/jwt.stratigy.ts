import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class jwtstategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.UserModel.findOne({ _id: id });

    if (!user) {
      throw new UnauthorizedException(
        'Please login first to access this endpoint.',
      );
    }
    // console.log(JSON.stringify(user));

    return user;
  }
}
