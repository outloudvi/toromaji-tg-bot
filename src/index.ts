import express, { Request, Response } from 'express'
import { Telegraf } from 'telegraf'
import { toRomaji } from 'wanakana'
import { nanoid } from 'nanoid'

import config from './config'

const bot = new Telegraf(config.token)

bot.on('text', (ctx) =>
  ctx.reply(toRomaji(ctx.message.text), {
    reply_to_message_id: ctx.message.message_id,
  })
)

bot.on('inline_query', (ctx) => {
  const text = toRomaji(ctx.inlineQuery.query)
  ctx.answerInlineQuery([
    {
      type: 'article',
      id: nanoid(),
      title: toRomaji(text),
      input_message_content: {
        message_text: toRomaji(text),
      },
    },
  ])
})

bot.telegram.setWebhook(`https://${config.appid}.deta.dev${config.path}`)

const app = express()

app.get('/', (_: Request, res: Response) => {
  res.send('Hello World!')
})

app.use(bot.webhookCallback(config.path))

module.exports = app
