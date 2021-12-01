import { REACTION } from "src/domain/aggregates/reaction.enum";

export class AddReactionCommand {
    constructor(
        public readonly id: string,
        public readonly fromUserId: string,
        public readonly reaction: REACTION,
    ) { }
}
