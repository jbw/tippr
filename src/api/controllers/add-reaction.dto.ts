import { IsNotEmpty, IsUUID } from "class-validator";
import { REACTION } from "src/domain/aggregates/reaction.enum";

import { ApiProperty } from "@nestjs/swagger";

export class AddReactionDto {

  @IsNotEmpty()
  @ApiProperty()
  reaction: REACTION;
}
