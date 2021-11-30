import { IsNotEmpty, IsUUID } from "class-validator";
import { REACTION } from "src/domain/aggregates/reaction.enum";

import { ApiProperty } from "@nestjs/swagger";

export class AddReactionDto {

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  userid: string;

  @IsNotEmpty()
  @ApiProperty()
  reaction: REACTION;
}
