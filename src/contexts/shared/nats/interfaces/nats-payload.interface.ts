export interface NatsPayloadInterface<T> {
  authUserId: string;
  lang: string;
  data: T;
}
