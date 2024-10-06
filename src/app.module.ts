import { Module } from '@nestjs/common';
import { NatsModule } from './contexts/shared/nats/nats.module';
import { UsersModule } from './contexts/users/infraestructure/users.module';
import { AuthModule } from './contexts/auth/infraestructure/auth.module';
import { HubModule } from './contexts/hub/infraestructure/hub.module';
import { ChatsModule } from './contexts/chats/infraestructure/chats.module';

@Module({
  imports: [
    // ProductsModule,
    NatsModule,
    AuthModule,
    UsersModule,
    HubModule,
    ChatsModule,
  ],
})
export class AppModule {}
