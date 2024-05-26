const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
        // コマンドの名前
		.setName('help')
        // コマンドの説明文
		.setDescription('困ったことがあったらここから！'),
	async execute(interaction) {
        // 返信
		await interaction.reply('何か困ったことはありましたか？\n何か問題がありましたら**白深やよい**のTwitter、またはDiscordにご連絡ください！');
	},
};
