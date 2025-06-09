import { PartialType } from '@nestjs/mapped-types';
import { registerDto } from './register.dto.';

export class updateUserDto extends PartialType(registerDto) {}
