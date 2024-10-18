import { Module } from '@nestjs/common';
import { NatsModule } from './contexts/shared/nats/nats.module';
import { UsersModule } from './contexts/users/infraestructure/users.module';
import { AuthModule } from './contexts/auth/infraestructure/auth.module';
import { HubModule } from './contexts/hub/infraestructure/hub.module';
import { ChatsModule } from './contexts/chats/infraestructure/chats.module';
import { HealthCheckModule } from './contexts/health-check/health-check.module';

@Module({
  imports: [
    NatsModule,
    AuthModule,
    UsersModule,
    HubModule,
    ChatsModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
