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
                message = `大吉だよ！！！！！！！！！！！！！！！！！！おめでとう！！！！！！！！！！！！！！！！！！！！！！！！！！！！`
                break;
            default:
                message = `人生を運で決めるのって良くないと思うんだよね`
                break;
        }

        await interaction.reply(`おみくじの結果は: **${randomResult}** です！${message}`);
    },
};
