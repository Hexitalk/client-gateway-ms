import {
  Controller,
  Get,
  Inject,
  /* Body,
  Post,
  UseGuards,
  BadRequestException,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Post,
  Query,*/
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { catchError /* , firstValueFrom*/ } from 'rxjs';
// import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
// import { firstValueFrom } from 'rxjs';
// import { CreateUserDto } from './dto';
// import { AuthGuard } from 'src/contexts/shared/guards/auth.guard';
// import { NatsPayloadFromRequestApi } from 'src/contexts/shared/decorators';

@Controller('users')
export class UsersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  findAll() {
    // return this.client.send({ cmd: 'users.create-user' }, {});
  }
}
