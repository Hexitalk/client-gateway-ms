import { IsNotEmpty } from 'class-validator';

export class GetChatDto {
  @IsNotEmpty()
  public targetProfileId: string;
}
