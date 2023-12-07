import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    await new Seeder.default(this.client).run()
  }
  public async run () {
    await this.runSeeder(await import('../CategorySeeder'))
    await this.runSeeder(await import('../UserSeeder'))
    await this.runSeeder(await import('../ThreadSeeder')) 
    await this.runSeeder(await import('../ReplySeeder')) 
}
}
