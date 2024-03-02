import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'

import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto'
import { AuthGuard } from '@nestjs/passport'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

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

  // @Post('')
  // async updateUser (
  // @Body() updateUserDto: UpdateUserDto
  // ) {
  //   await this.authService.update()
  // }

  @Get()
  @UseGuards(AuthGuard())
  async getUsers (
  @Query() paginationDto: PaginationDto
  ) {
    return await this.authService.findAll(paginationDto)
  }
}
