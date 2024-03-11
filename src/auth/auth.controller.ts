import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto'
import { PaginationDto } from 'src/common/dtos/pagination.dto'
import { GetUser } from './decorators'
import { User } from './entities/user.entity'
import { EmailService } from '../email/email.service'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}

  @Post('register')
  async createUser (
  @Body() createUserDto: CreateUserDto
  ) {
    const data = await this.authService.create(createUserDto)
    const { name, email } = data.user

    await this.emailService.sendUserConfirmation({ name, email, token: data.token })

    return data
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

  @Get('check-auth-status')
  @UseGuards(AuthGuard())
  checkAuthStatus (
  @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus(user)
  }

  @Get('confirm')
  async verifyUserEmail (
  @Query('token') token: string
  ) {
    return await this.authService.verifyUserEmail(token)
  }
}
