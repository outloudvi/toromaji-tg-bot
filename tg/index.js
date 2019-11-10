var bot = require("./utils").bot
const wana = require("wanakana");
const nanoid = require("nanoid");
var globRes = undefined;
var timeoutL = 0;

function cls() {
  globRes && globRes.send("Done.")
  timeoutL && clearTimeout(timeoutL)
  globRes = undefined
  timeoutL = 0
}

bot.on('text', (msg) => {
  if (msg.text === "ping") {
    bot.sendMessage(msg.chat.id, 'hello, world').then(cls)
  } else {
    bot.sendMessage(msg.chat.id, wana.toRomaji(msg.text)).then(cls)
  }
});

bot.on('inline_query', (msg) => {
  let ret = wana.toRomaji(msg.query)
  bot.answerInlineQuery(msg.id, [{
    type: "article",
    id: nanoid(),
    title: ret,
    input_message_content: {
      message_text: ret
    }
  }]).then(cls)
})

module.exports = (req, res) => {
  if (req.body && req.body.update_id) {
    bot.processUpdate(req.body)
    console.log("Processed")
    globRes = res;
    timeoutL = setTimeout(() => {
      res.send(`Done.`)
    }, 5000)
  } else {
    console.log("Not processed")
    res.send("Fail to fetch message.")
  }
}