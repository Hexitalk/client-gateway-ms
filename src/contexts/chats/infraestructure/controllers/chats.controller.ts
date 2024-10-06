import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { NatsPayloadFromRequestApi } from '../../../shared/decorators';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces/nats-payload.interface';
import { CreateChatDto, GetChatDto } from './dto';
import { SendChatLineDto } from './dto/send-chat-line.dto';

@Controller('chats')
export class ChatsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @Post('create-chat')
  createChat(
    @Body('params') createChatDto: CreateChatDto,
    @NatsPayloadFromRequestApi()
    payload: NatsPayloadInterface<CreateChatDto>,
  ) {
    payload.data = createChatDto;
    return this.client.send({ cmd: 'chats.create-chat' }, payload).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Post('get-chat')
  getChat(
    @Body('params') getChatDto: GetChatDto,
    @NatsPayloadFromRequestApi()
    payload: NatsPayloadInterface<GetChatDto>,
  ) {
    payload.data = getChatDto;
    return this.client.send({ cmd: 'chats.get-chat' }, payload).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Post('send-chat-line')
  sendChatLine(
    @Body('params') sendChatLineDto: SendChatLineDto,
    @NatsPayloadFromRequestApi()
    payload: NatsPayloadInterface<SendChatLineDto>,
  ) {
    payload.data = sendChatLineDto;
    return this.client.send({ cmd: 'chats.send-chat-line' }, payload).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
