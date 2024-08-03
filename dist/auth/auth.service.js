"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const common_2 = require("../common");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, cloudinaryService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.cloudinaryService = cloudinaryService;
    }
    async create(createUserDto) {
        const { password, ...data } = createUserDto;
        try {
            const user = this.userRepository.create({
                ...data,
                password: common_2.BcryptAdapter.hashSync(password, 10)
            });
            const { id, name, email, image } = await this.userRepository.save(user);
            const token = this.getJwt({ id: user.id });
            user.emailToken = token;
            await this.userRepository.save(user);
            return {
                user: { id, name, email, image },
                token
            };
        }
        catch (error) {
            this.handleExceptionErrors(error);
        }
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            select: ['id', 'name', 'email', 'password', 'roles', 'emailVerified', 'isActive', 'image']
        });
        if (!user)
            throw new common_1.UnauthorizedException('Credentials are not valid');
        if (!common_2.BcryptAdapter.compareSync(password, user.password))
            throw new common_1.UnauthorizedException('Credentials are not valid');
        if (!user.isActive)
            throw new common_1.ForbiddenException('User is inactive');
        if (!user.emailVerified)
            throw new common_1.ForbiddenException('User unverified');
        delete user.password;
        delete user.isActive;
        delete user.emailVerified;
        return {
            user: { ...user },
            token: this.getJwt({ id: user.id })
        };
    }
    async findAll(paginationDto) {
        const { limit = 5, offset = 0 } = paginationDto;
        return await this.userRepository.find({
            take: limit,
            skip: offset
        });
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id, isActive: true });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        return user;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }
    async update(id, updateUserDto) {
        const { currentPassword, newPassword, ...data } = updateUserDto;
        const user = await this.userRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'password', 'image', 'isActive']
        });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        if (!user.isActive)
            throw new common_1.UnauthorizedException('The user is inactive');
        if (user.id === '66442f80-4814-4042-8795-5d7b3df67943')
            throw new common_1.UnauthorizedException('Default user cannot be updated');
        if (currentPassword && newPassword) {
            if (!common_2.BcryptAdapter.compareSync(currentPassword, user.password))
                throw new common_1.UnauthorizedException('Invalid password');
            user.password = common_2.BcryptAdapter.hashSync(newPassword, 10);
        }
        const updatedUser = await this.userRepository.save({
            ...user,
            ...data
        });
        delete updatedUser.password;
        delete updatedUser.isActive;
        delete updatedUser.emailToken;
        return updatedUser;
    }
    checkAuthStatus(user) {
        const { id, name, image, email, roles } = user;
        return {
            user: { id, name, email, image, roles },
            token: this.getJwt({ id: user.id })
        };
    }
    async verifyUserEmail(emailToken) {
        this.verifyJwt(emailToken);
        const user = await this.userRepository.findOne({
            where: { emailToken }
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.emailVerified)
            throw new common_1.ForbiddenException('User already verified');
        user.emailVerified = true;
        user.emailToken = null;
        await this.userRepository.save(user);
        return {
            message: 'Token verified',
            statusCode: 200
        };
    }
    async updateProfilePicture(id, file) {
        await this.findOne(id);
        const { secure_url: secureUrl } = await this.cloudinaryService.uploadFile(file, 'fashion-like/users');
        return secureUrl;
    }
    getJwt(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
    verifyJwt(token) {
        try {
            this.jwtService.verify(token);
        }
        catch (error) {
            this.handleExceptionErrors(error);
        }
    }
    handleExceptionErrors(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException('Email already exists');
        if (error instanceof jwt_1.JsonWebTokenError)
            throw new common_1.UnauthorizedException('Invalid token');
        if (error instanceof jwt_1.TokenExpiredError)
            throw new common_1.UnauthorizedException('Token has expired');
        throw new common_1.InternalServerErrorException('Error: Check server logs');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        cloudinary_service_1.CloudinaryService])
], AuthService);
//# sourceMappingURL=auth.service.js.map