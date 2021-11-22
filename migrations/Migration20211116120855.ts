import { Migration } from '@mikro-orm/migrations';

export class Migration20211116120855 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tip" drop column "created"; ')
     }

}
