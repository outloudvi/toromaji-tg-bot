const TelegramBot = require('node-telegram-bot-api')
const TOKEN = process.env.TELEGRAM_TOKEN
const options = { webHook: { port: 443 } }
const bot = new TelegramBot(TOKEN, options)

module.exports = {
    bot
}