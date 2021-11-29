import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateTipDto {

  @IsPositive()
  amount: number;

  @IsNotEmpty()
  message: string;
}
