export class CreateTipCommand {
    constructor(
        public readonly amount: number,
        public readonly message: string,
    ) { }
}