import { Module } from '@nestjs/common';

import { NatsModule } from 'src/contexts/shared/nats/nats.module';
import { HubController } from './controllers/hub.controller';

@Module({
  controllers: [HubController],
  imports: [NatsModule],
})
export class HubModule {}
