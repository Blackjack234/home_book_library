import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { registerDto } from './dto/register.dto.';

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
}
