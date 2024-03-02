import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { BcryptAdapter } from '../common/adapters/bcrypt.adapter'
import { type LoginUserDto, type CreateUserDto, type UpdateUserDto } from './dto'
import { type IJwtPayload } from './interfaces'
import { type PaginationDto } from 'src/common/dtos/pagination.dto'

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
      select: { id: true, email: true, password: true }
    })

    if (!user) throw new UnauthorizedException('Credentials are not valid')

    if (!BcryptAdapter.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid')

    return {
      ...user,
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

  // async update (updateUserDto: UpdateUserDto) {
  //   const user = this.userRepository.update()
  // }

  private getJwt (payload: IJwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  private handleExceptionErrors (error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail)

    throw new InternalServerErrorException('Error: Check server logs')
  }
}
