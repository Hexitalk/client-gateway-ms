import { Module } from '@nestjs/common';
import { NatsModule } from './contexts/shared/nats/nats.module';
import { UsersModule } from './contexts/users/infraestructure/users.module';
import { AuthModule } from './contexts/auth/infraestructure/auth.module';
import { HubModule } from './contexts/hub/infraestructure/hub.module';

@Module({
  imports: [
    // ProductsModule,
    NatsModule,
    AuthModule,
    UsersModule,
    HubModule,
  ],
})
export class AppModule {}
