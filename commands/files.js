const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('file')
        .setDescription('指定したファイルを送信します')
        .addStringOption(option => 
            option.setName('filename')
                .setDescription('送信するファイルの名前')
                .setRequired(true)),
    async execute(interaction) {
        const fileName = interaction.options.getString('filename');
        const folderPaths = [
            process.env.SEARCH_FILE1,
            process.env.SEARCH_FILE2
        ];

        function findFileInFolders(folders, fileName) {
            for (const folderPath of folders) {
                const result = findFile(folderPath, fileName);
                if (result) return result;
            }
            return null;
        }

        function findFile(dir, fileName) {
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    const found = findFile(filePath, fileName);
                    if (found) return found;
                } else if (file === fileName) {
                    return filePath;
                }
            }
            return null;
        }

        const filePath = findFileInFolders(folderPaths, fileName);

        if (filePath) {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    interaction.reply('ファイルの読み込みに失敗しました。');
                    return;
                }

                const maxLength = 2000;
                if (data.length > maxLength) {
                    const parts = data.match(new RegExp(`.{1,${maxLength}}`, 'g'));
                    for (const part of parts) {
                        interaction.followUp(`続き:\n\`\`\`${part}\`\`\``);
                    }
                } else {
                    interaction.reply(`${fileName} の中身はこちら！:\n\`\`\`${data}\`\`\``);
                }
            });
        } else {
            interaction.reply('ファイルが見つかりませんでした。');
        }
    }
};
