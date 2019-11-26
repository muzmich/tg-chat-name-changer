const Telegraf = require('telegraf');
const generateName = require('./components/generateName');

const bot = new Telegraf(process.env.BOT_TOKEN);

let intervals = {};
bot.command('start', ctx => {
    intervals[ctx.chat.id] = setInterval(async function () {
        bot.telegram.setChatTitle(ctx.chat.id, await generateName());
    }, 10 * 1000);
    return ctx.reply('Ууу сук, ща как буду раз в час имена менять');
});

bot.command('stop', ctx => {
    clearInterval(intervals[ctx.chat.id]);
    return ctx.reply('Всё, больше не буду');
});

bot.launch().then(() => console.log('Bot is up'));