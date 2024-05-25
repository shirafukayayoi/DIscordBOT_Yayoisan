require('dotenv').config();     //.envを使うためのコード。
const { Client, GatewayIntentBits, Events } = require('discord.js');    //discord.jsの機能、Client, GatewayIntentBits, Eventを使わせてくださいというコード。
const client = new Client({ intents: [GatewayIntentBits.Guilds] });     //clientという関数の中にはintentsの機能が含まれてるよーというコード

//DiscordBotにログイン
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);    //ログインしたのを確認{client.user.tag}でbotの名前を出す
});

client.once(Events.ClientReady, c => {  //
    client.user.setActivity('やよいさんのお世話を実行中～');
});

client.login(process.env.DISCORDBOTTOKEN); //環境変数からトークンを取得してログイン