const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        // コマンドの名前
        .setName('omikuji')
        // コマンドの説明文
        .setDescription('おみくじ、してみない？'),
    async execute(interaction) {
        const results = [       //複数あるときは[]を使う。
            '大吉',
            '中吉',
            '小吉',
            '吉',
            '末吉',
            '凶',
            '大凶'
        ];

        const randomResult = results[Math.floor(Math.random() * results.length)];       //ランダムに結果を出す

        let message = '';
        switch (randomResult) {
            case `大吉`:
                message = `大吉だよ！！今なら人生なんでも上手くいくよ！！！！（多分）`
                break;
            case `中吉`:
                message = `何かいいことが起きる予感。人生楽しもうぜ。`
                break;
            case `小吉`:
                message = `君に小さな幸せが訪れますように。`
                break;
            case `吉`:
                message = `まあ、悪くないね。普通の日常が幸せだよ。`
                break;
            case `末吉`:
                message = `何か悪いことが起きるかも？警戒しておいて損はないね。`
                break;
            case `凶`:
                message = `Badfeeling...`
                break;
            case `大凶`:
                message = `何もかも上手くいかないかも。こういう日もあるって割り切ろうぜ。`
                break;
            default:
                message = `人生を運で決めるのって良くないと思うんだよね`
                break;
        };

        await interaction.reply(`おみくじの結果は**${randomResult}**です！\n${message}`);
    },
};
