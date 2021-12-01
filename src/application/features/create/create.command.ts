export class CreateTipCommand {
  constructor(

    public readonly fromUserId: string,
    public readonly toUserId: string,
    public readonly amount: number,
    public readonly message: string,
  ) {}
}
