const Telegraf = require('telegraf');
const generateName = require('./components/generateName');
const express = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);
const rest = express();

rest.use(express.json());
rest.use(express.urlencoded({ extended: false }));

let intervals = {};
let chats = {};
bot.command('start', ctx => {
    intervals[ctx.chat.id] = setInterval(async function () {
        const newName = await generateName();
        console.log(`[${ctx.chat.id}] New name: ${newName}`)
        bot.telegram.setChatTitle(ctx.chat.id, newName);
    }, 12 * 60 * 60 * 1000);

    if (!chats[ctx.chat.id.toString()]) {
        chats[ctx.chat.id] = ctx.chat;
    }

    console.log(`[${ctx.chat.id}] Started`)
    return ctx.reply('Ууу сук, ща как буду раз в час имена менять');
});

bot.command('stop', ctx => {
    clearInterval(intervals[ctx.chat.id]);
    console.log(`[${ctx.chat.id}] Stopped`)
    return ctx.reply('Всё, больше не буду');
});

rest.get('/chats', (req, res) => {
    res.send(chats);
});

bot.launch().then(() => console.log('Bot is up'));
rest.listen(process.env.PORT || 3000);
