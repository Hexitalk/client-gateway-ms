import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NatsPayloadInterface } from '../nats/interfaces/nats-payload.interface';

export const NatsPayloadFromRequestApi = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): NatsPayloadInterface<unknown> => {
    const request = ctx.switchToHttp().getRequest();

    const lang =
      request.query.lang ?? request.params.lang ?? request.body.lang ?? 'en';

    const payload: NatsPayloadInterface<unknown> = {
      lang,
      authUserId: request.authUser?.id ?? '',
      data: undefined as unknown,
    };

    return payload;
  },
);
