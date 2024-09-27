import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { NatsPayloadFromRequestApi } from '../../../shared/decorators';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { NatsPayloadInterface } from 'src/contexts/shared/nats/interfaces/nats-payload.interface';
import { SetHubChatStateDto } from './dto';

@Controller('hub')
export class HubController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @UseGuards(AuthGuard)
  @Post('get-hub')
  getHub(
    @NatsPayloadFromRequestApi()
    payload: NatsPayloadInterface<void>,
  ) {
    return this.client.send({ cmd: 'hub.get-hub' }, payload).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Post('set-hub-chat-state')
  setHubChatState(
    @Body('params') setHubChatStateDto: SetHubChatStateDto,
    @NatsPayloadFromRequestApi()
    payload: NatsPayloadInterface<SetHubChatStateDto>,
  ) {
    payload.data = setHubChatStateDto;
    return this.client.send({ cmd: 'hub.set-hub-chat-state' }, payload).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
