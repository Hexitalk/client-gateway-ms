import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { LoginUserDto, RegisterUserDto } from './dto';
import {
  AuthUser,
  NatsPayloadFromRequestApi,
  Token,
} from '../../../shared/decorators';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { AuthUserInterface } from '../../domain/interfaces/auth-user.interface';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces/nats-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  test() {
    return { test: 'ok' };
  }

  @Post('register')
  registerUser(
    @Body('params') registerUserDto: RegisterUserDto,
    @NatsPayloadFromRequestApi() payload: NatsPayloadInterface<RegisterUserDto>,
  ) {
       
    payload.data = registerUserDto;
    return this.client.send({ cmd: 'auth.register-user' }, payload).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  loginUser(
    @Body('params') loginUserDto: LoginUserDto,
    @NatsPayloadFromRequestApi() payload: NatsPayloadInterface<LoginUserDto>,
  ) {
    payload.data = loginUserDto;
    return this.client.send({ cmd: 'auth.login-user' }, payload).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyToken(@AuthUser() authUser: AuthUserInterface, @Token() token: string) {
    return { authUser, token };
  }
}
