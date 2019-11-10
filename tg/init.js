var bot = require("./utils").bot

module.exports = (req, res) => {
    const url = process.env.NOW_URL;
    bot.setWebHook(`${url}/tg`);
    setTimeout(() => {
        res.send(`Initialization completed.`)
    }, 5000);
}