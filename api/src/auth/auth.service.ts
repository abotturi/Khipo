import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { comparePass } from '../bcrypt/bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async validateUser(email: string, password: string){
        const user = await this.userService.findOneByEmail(email)

        if(user && await comparePass(password, user.password)){
            const { password, ...result } = user;

            return  result
        }

        return null
    }

    async login(user: any){
        const payload = { email: user.email, sub: user.id };
        return {
            ...user,
            access_token: this.jwtService.sign(payload),
        };        
    }
}
