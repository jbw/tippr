import { IsNotEmpty, IsPositive, IsUUID, Min } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateTipDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  userid: string;

  @Min(1)
  @IsPositive()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
