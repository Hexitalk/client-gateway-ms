import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { NatsPayloadInterface } from '../nats/interfaces/nats-payload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const lang =
        request.query.lang ?? request.params.lang ?? request.body.lang ?? 'en';

      const payload: NatsPayloadInterface<string> = {
        lang,
        authUserId: '',
        data: token,
      };

      const { user: authUser, token: newToken } = await firstValueFrom(
        this.client.send({ cmd: 'auth.verify-user' }, payload),
      );

      request['authUser'] = authUser;
      request['token'] = newToken;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
