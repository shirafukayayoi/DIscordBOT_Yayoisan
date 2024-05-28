const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')    //名前
        .setDescription('ダイスを振ります。')   //説明
        .addNumberOption(option => option.setName('回数').setDescription('何回降りますか'))     //オプション1
        .addNumberOption(option => option.setName('面数').setDescription('何面ですか')),        //オプション2
    async execute(interaction) {
        const times = interaction.options.getNumber('回数');        //オプションを関数にいれる
        const side = interaction.options.getNumber('面数');         //オプションを関数にいれる。
        if (times > 500 && side > 10 || side > 10000 || times > 200 && side > 1000) return await interaction.reply('数字が大きすぎます。');
        let total = 0;
        const list = [];
        for (let i = 0; i < times; i++) {
            const num = Math.floor(Math.random() * side) + 1;
            total += num;
            list.push(num);
        }
        await interaction.reply(`${times.toString()}d${side.toString()} >> **${total.toString()}** \`(${list})\``);
    },
};
