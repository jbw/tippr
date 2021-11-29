import { IsNotEmpty, IsPositive, Min } from "class-validator";

import { ApiBody, ApiProperty } from "@nestjs/swagger";

export class CreateTipDto {

  @Min(1)
  @IsPositive()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @ApiProperty()
  message: string;
}
