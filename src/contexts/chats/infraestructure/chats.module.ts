import { Module } from '@nestjs/common';

import { NatsModule } from 'src/contexts/shared/nats/nats.module';
import { ChatsController } from './controllers/chats.controller';

@Module({
  controllers: [ChatsController],
  imports: [NatsModule],
})
export class ChatsModule {}
