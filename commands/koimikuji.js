const { SlashCommandBuilder } = require('discord.js');      //Discordのスラッシュコマンドを作るのに必要
const fs = require('fs');   //ファイル操作のために必要
const csv = require('csv-parser');      //csvファイルを読み込むために必要

module.exports = {
    data: new SlashCommandBuilder()
        .setName('koimikuji')     //名前
        .setDescription('大吉と大凶のみ！恋みくじ！！！'),      //説明
    async execute(interaction) {
        // CSVファイルからおみくじのデータを読み込む
        const results = [];
        fs.createReadStream('./csv/koimikuji.csv')      //ここでcsvを読み込み、ストリーム（少しずつ読み込む処理）として処理
            .pipe(csv())        //csv-parsarのモジュールに繋げる。
            .on('data', (row) => {      //ストリームの処理が読み込まれると実行させるようにするコード
                results.push(row);      //ストリームから読み込まれたrow(一行)をデータとしてresultsに渡す。pushは与える、のはず。
            })
            .on('end', async () => {    //ストリームが終了したときに読み込むためのコード
                //Math.floorで0~1のランダムの値を作り、取得した行数でかける。出た値をMath.floorによって小数点を切り捨てる。
                const randomResult = results[Math.floor(Math.random() * results.length)];

                //await interaction.replyでコマンドを送ってきたユーザに対してリプを送る。
                await interaction.reply(`恋みくじの結果は**${randomResult.result}**です！\n${randomResult.message}`);
            });
    },
};
