import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  public profilesIds: string[];

  @IsOptional()
  public hubChatId: string;
}
