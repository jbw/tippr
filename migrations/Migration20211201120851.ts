import { Migration } from '@mikro-orm/migrations';

export class Migration20211201120851 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "reaction" add column "from_user_id" varchar(255) not null;');
  }

}
