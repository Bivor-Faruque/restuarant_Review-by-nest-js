import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from './get-user.decorator';
import { UserI } from './interfaces/user.interface';
import { UserDocument } from './schema/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    //const { password } = createUserDto;
    return await this.userService.createUser(
      createUserDto.fname,
      createUserDto.lname,
      createUserDto.email,
      createUserDto.password,    
      createUserDto.address,
      createUserDto.userType,
    );
  }
  
  @Get()
  findAll(
    @Param('limit') limit: string,
    @Param('skip') skip: string,
    @Param('fname') fname: string,
  ) {
    return this.userService.findAll(limit, skip, fname);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Post('signIn')
  signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(email, password);
  }

  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req, @GetUser() user: UserI) {
    console.log(req);
    return { message: 'User is authenticated', user: user };
  }
}
