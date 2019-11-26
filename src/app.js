const Telegraf = require('telegraf');
const generateName = require('./components/generateName');
const express = require('express');

const bot = new Telegraf(process.env.BOT_TOKEN);

let intervals = {};
bot.command('start', ctx => {
    intervals[ctx.chat.id] = setInterval(async function () {
        const newName = await generateName();
        console.log(`New name for chat ${ctx.chat.id} - ${newName}`)
        bot.telegram.setChatTitle(ctx.chat.id, newName);
    }, 10 * 1000);
    console.log(`Changing for chat ${ctx.chat.id} started`)
    return ctx.reply('Ууу сук, ща как буду раз в час имена менять');
});

bot.command('stop', ctx => {
    clearInterval(intervals[ctx.chat.id]);
    console.log(`Changing for chat ${ctx.chat.id} stopped`)
    return ctx.reply('Всё, больше не буду');
});

bot.launch().then(() => console.log('Bot is up'));
express().listen(process.env.PORT || 3000);
