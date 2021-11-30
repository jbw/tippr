export class CreateTipCommand {
  constructor(
    public readonly userid: string,
    public readonly amount: number,
    public readonly message: string,
  ) {}
}
