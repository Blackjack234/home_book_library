import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { registerDto } from './dto/register.dto.';
import { loginDto } from './dto/login.dto';

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
}
