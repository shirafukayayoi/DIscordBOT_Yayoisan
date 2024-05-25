require('dotenv').config();     //.envを使うためのコード。
const { Client, GatewayIntentBits } = require('discord.js');    //discord.jsの機能、Client, GatewayIntentBitsを使わせてくださいというコード。
const client = new Client({ intents: [GatewayIntentBits.Guilds] });     //clientという関数の中にはintentsの機能が含まれてるよーというコード

//DiscordBotにログイン
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);    //ログインしたのを確認{client.user.tag}でbotの名前を出す
});

client.login(process.env.DISCORDBOTTOKEN); //環境変数からトークンを取得してログイン