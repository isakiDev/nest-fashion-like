import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { User } from '../entities/user.entity'
import { type IJwtPayload } from '../interfaces'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate ({ id }: IJwtPayload) {
    console.log(id)
    const user = await this.userRepository.findOneBy({ id })

    if (!user) throw new UnauthorizedException('Token not valid')
    if (!user.isActive) throw new UnauthorizedException('User is inactive')
    if (!user.emailVerifiedAt) throw new UnauthorizedException('Unveried user')

    return user
  }
}
