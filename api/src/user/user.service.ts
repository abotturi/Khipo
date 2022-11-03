import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from '../prisma/prisma'
import { encryptPass } from 'src/bcrypt/bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))    
    private readonly authService: AuthService
  ){}

  async create(createUserDto: CreateUserDto) {
    const checkEmailExist = await prisma.user.findFirst({
      where: {
        email: createUserDto.email
      },
      select: {
        email: true
      }
    })

    if(checkEmailExist){
      throw new HttpException('Email already in use', HttpStatus.CONFLICT)
    }
    
    createUserDto.password = await encryptPass(createUserDto.password)
    
    const newUser = await prisma.user.create({data: createUserDto})
    delete newUser.password
    return this.authService.login(newUser);
  }

  async findOneByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    return user;
  }

  async delete(id: string){
    const checkUser = await prisma.user.findFirst({
      where: {
        id
      }
    })
    
    if(!checkUser){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    
    await prisma.user.delete({
      where: {
        id
      }
    })
    
    return {message: 'User successfully deleted'}
  }
}
