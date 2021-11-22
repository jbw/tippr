import { Migration } from '@mikro-orm/migrations';

export class Migration20211116121218 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tip" add column "created" timestamptz(0) not null;');
  }

}
