import ReplyFactory from 'App/Models/Reply'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(ReplyFactory, ({ faker }) => {
  return {
    userId: Math.floor(Math.random() * 2) + 1,
    threadId: Math.floor(Math.random() * 50) + 1,
    content: faker.lorem.sentences(2),
  }
}).build()
