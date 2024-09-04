import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.authUser) {
      throw new InternalServerErrorException(
        'User not found in request (AuthGuard called?)',
      );
    }

    return request.authUser;
  },
);
