import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto'
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

  // TODO: add image to upload
  @Patch('/:id')
  @UseGuards(AuthGuard())
  async updateUser (
  @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.authService.update(id, updateUserDto)
  }

  @Get()
  @UseGuards(AuthGuard())
  async getUsers (
  @Query() paginationDto: PaginationDto
  ) {
    return await this.authService.findAll(paginationDto)
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteUser (
  @Param('id', ParseUUIDPipe) id: string
  ) {
    await this.authService.remove(id)
  }
}
