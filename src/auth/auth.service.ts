import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt'

import { Repository } from 'typeorm'

import { User } from './entities/user.entity'
import { BcryptAdapter } from '../common'
import { type LoginUserDto, type CreateUserDto, type UpdateUserDto } from './dto'
import { type IJwtPayload } from './interfaces'
import { type PaginationDto } from '../common'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create (createUserDto: CreateUserDto) {
    const { password, ...data } = createUserDto

    try {
      const user = this.userRepository.create({
        ...data,
        password: BcryptAdapter.hashSync(password, 10)
      })

      const { id, name, email, image } = await this.userRepository.save(user)

      // delete user.password

      const token = this.getJwt({ id: user.id })

      user.emailToken = token

      await this.userRepository.save(user)

      return {
        user: { id, name, email, image },
        token
      }
    } catch (error) {
      this.handleExceptionErrors(error)
    }
  }

  async login (loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'roles', 'emailVerified', 'isActive', 'image']
    })

    if (!user) throw new UnauthorizedException('Credentials are not valid')
    if (!BcryptAdapter.compareSync(password, user.password)) throw new UnauthorizedException('Credentials are not valid')
    if (!user.isActive) throw new ForbiddenException('User is inactive')
    if (!user.emailVerified) throw new ForbiddenException('User unverified')

    // TODO: refactor
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
    const { currentPassword, newPassword, ...data } = updateUserDto

    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'password', 'image', 'isActive']
    })

    if (!user) throw new NotFoundException(`User with id ${id} not found`)
    if (!user.isActive) throw new UnauthorizedException('The user is inactive')

    if (currentPassword && newPassword) {
      if (!BcryptAdapter.compareSync(currentPassword, user.password)) throw new UnauthorizedException('Invalid password')

      user.password = BcryptAdapter.hashSync(newPassword, 10)
    }

    const updatedUser = await this.userRepository.save({
      ...user,
      ...data
    })

    delete updatedUser.password
    delete updatedUser.isActive
    delete updatedUser.emailToken

    return updatedUser
  }

  checkAuthStatus (user: User) {
    const { id, name, image, email, roles } = user

    return {
      user: { id, name, email, image, roles },
      token: this.getJwt({ id: user.id })
    }
  }

  async verifyUserEmail (emailToken: string) {
    // TODO: refactor

    this.verifyJwt(emailToken)

    const user = await this.userRepository.findOne({
      where: { emailToken }
    })

    if (!user) throw new NotFoundException('User not found')
    if (user.emailVerified) throw new ForbiddenException('User already verified')

    user.emailVerified = true
    user.emailToken = null

    await this.userRepository.save(user)

    return {
      message: 'Token verified',
      statusCode: 200
    }
  }

  async updateProfilePicture (id: string, file: Express.Multer.File) {
    await this.findOne(id)

    const { secure_url: secureUrl } = await this.cloudinaryService.uploadFile(file, 'fashion-like/users')

    return secureUrl
  }

  private getJwt (payload: IJwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  private verifyJwt (token: string) {
    try {
      this.jwtService.verify(token)
    } catch (error) {
      this.handleExceptionErrors(error)
    }
  }

  private handleExceptionErrors (error: any): never {
    // if (error.code === '23505') throw new BadRequestException(error.detail)
    if (error.code === '23505') throw new BadRequestException('Email already exists')
    if (error instanceof JsonWebTokenError) throw new UnauthorizedException('Invalid token')
    if (error instanceof TokenExpiredError) throw new UnauthorizedException('Token has expired')

    throw new InternalServerErrorException('Error: Check server logs')
  }
}
