import { Migration } from '@mikro-orm/migrations';

export class Migration20211201115600 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tip" rename column "userid" to "from_user_id";');


    this.addSql('alter table "tip" add column "to_user_id" varchar(255) not null;');
  }

}
