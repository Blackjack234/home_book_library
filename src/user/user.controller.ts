import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { registerDto } from './dto/register.dto.';
import { loginDto } from './dto/login.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { jwtstategy } from 'src/auth/jwt.stratigy';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('register')
  async register(
    @Body()
    resgisterDto: registerDto,
  ) {
    try {
      const result = await this.UserService.registerUser(resgisterDto);

      return result;
    } catch (e) {
      throw new Error(`somthing went wrong ${e.message}`);
    }
  }

  @Post('login')
  async login(@Body() loginDto: loginDto) {
    try {
      const result = await this.UserService.login(loginDto);

      return result;
    } catch (e) {
      throw new Error(`somthing went wrong ${e.message}`);
    }
  }

  @Patch('update')
  @UseGuards(AuthGuard())
  async updateUser(@Body() updateUser: updateUserDto, @Req() req: Request) {
    try {
      console.log(updateUser);
      console.log(req.user);
      const user = req.user as any;

      const id = user._id;

      const result = await this.UserService.update(updateUser, id);

      return 'user update successfull.';
    } catch (e) {
      throw new Error(`something went wrong ${e.message}`);
    }
  }
}
