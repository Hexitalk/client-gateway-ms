import { Module } from '@nestjs/common';

import { NatsModule } from 'src/contexts/shared/nats/nats.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [NatsModule],
})
export class AuthModule {}
