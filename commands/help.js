const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        // コマンドの名前
		.setName('help')
        // コマンドの説明文
		.setDescription('困ったことがあったらここから！'),
	async execute(interaction) {
        // 返信
		await interaction.reply('何か困ったことはありましたか!？');
	},
};
