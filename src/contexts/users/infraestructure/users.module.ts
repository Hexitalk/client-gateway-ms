import { Module } from '@nestjs/common';
import { NatsModule } from 'src/contexts/shared/nats/nats.module';
import { UsersController } from './controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [],
  imports: [NatsModule],
})
export class UsersModule {}
