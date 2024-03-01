import { Body, Controller, Post } from '@nestjs/common'

import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  async createUser (
  @Body() createUserDto: CreateUserDto
  ) {
    return await this.authService.create(createUserDto)
  }

  @Post('login')
  async loginUser (
  @Body() loginUserDto: LoginUserDto
  ) {
    return await this.authService.login(loginUserDto)
  }
}
