import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ReplyFactory from 'Database/factories/ReplyFactory'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await ReplyFactory.createMany(150)
  }
}
