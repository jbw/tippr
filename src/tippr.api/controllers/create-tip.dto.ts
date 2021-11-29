import { IsNotEmpty, IsPositive, Min } from "class-validator";

export class CreateTipDto {

  @Min(1)
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  message: string;
}
