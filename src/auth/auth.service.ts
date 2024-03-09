import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { BcryptAdapter } from '../common/adapters/bcrypt.adapter'
import { type LoginUserDto, type CreateUserDto, type UpdateUserDto } from './dto'
import { type IJwtPayload } from './interfaces'
import { type PaginationDto } from '../common/dtos/pagination.dto'

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create (createUserDto: CreateUserDto) {
    const { password, ...data } = createUserDto

    try {
      const user = this.userRepository.create({
        ...data,
        password: BcryptAdapter.hashSync(password, 10)
      })

      await this.userRepository.save(user)

      delete user.password

      return {
        ...user,
        token: this.getJwt({ id: user.id })

      }
    } catch (error) {
      this.handleExceptionErrors(error)
    }
  }

  async login (loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: { id: true, name: true, email: true, password: true, emailVerified: true, isActive: true, image: true }
    })

    if (!user) throw new UnauthorizedException('Credentials are not valid')
    if (!BcryptAdapter.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid')
    if (!user.isActive) throw new ForbiddenException('User is inactive')
    if (!user.emailVerified) throw new ForbiddenException('User unverified')

    // TODO: refactor isActive
    delete user.password
    delete user.isActive
    delete user.emailVerified

    return {
      user: { ...user },
      token: this.getJwt({ id: user.id })
    }
  }

  async findAll (paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto

    return await this.userRepository.find({
      take: limit,
      skip: offset
    })
  }

  async findOne (id: string) {
    const user = await this.userRepository.findOneBy({ id, isActive: true })

    if (!user) throw new NotFoundException(`User with id ${id} not found`)

    return user
  }

  async remove (id: string) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
  }

  async update (id: string, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto

    if (password) {
      updateUserDto.password = BcryptAdapter.hashSync(password, 10)
    }

    const user = await this.userRepository.preload({
      id,
      ...updateUserDto
    })

    if (!user.isActive) throw new ForbiddenException('User is inactive')

    const { password: newPassword, ...newData } = await this.userRepository.save(user)

    return newData
  }

  private getJwt (payload: IJwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  checkAuthStatus (user: User) {
    const { id, name, image, email } = user

    return {
      user: { id, name, email, image },
      token: this.getJwt({ id: user.id })
    }
  }

  private handleExceptionErrors (error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail)

    throw new InternalServerErrorException('Error: Check server logs')
  }
}
