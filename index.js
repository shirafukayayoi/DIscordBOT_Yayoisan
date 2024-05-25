require('dotenv').config();     //.envを使うためのコード。
const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');    //discord.jsのモジュール、Client, GatewayIntentBits, Eventを使わせてくださいというコード。
const client = new Client({ intents: [GatewayIntentBits.Guilds] });     //clientという関数の中にはintentsの機能が含まれてるよーというコード
const path = require(`node:path`)   //ディレクトリなどを操作するために必要なモジュール。
const fs =require(`node:fs`)    //ファイルシステムを操作するためのモジュール

//DiscordBotにログイン
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);    //ログインしたのを確認{client.user.tag}でbotの名前を出す
});

client.commands = new Collection();     //コマンドを格納すぐ場所の作成

const commandsPath = path.join(__dirname, 'commands');      //コマンドファイルが保存されているディレクトリパスを関数に。dirnameはこのディレクトリパス、それに/commandをpath.joinによって追加している
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));     //コマンドファイルのリストを取得し、.jsだけ取得するための関数

for (const file of commandFiles) {      //各コマンドファイルを処理
	const filePath = path.join(commandsPath, file);     //上で定義したcommandspathの後に、上で取得したファイル名を後づけする。
    console.log(filePath)      //読み込んだファイルの確認
	const command = require(filePath);      //取得したファイルをrequiteによって読み込む。
	if ('data' in command && 'execute' in command) {    //左から読むとdataはcommandの中にあるか、executeはcommandの中にあるか。executeはコマンドを実行するために必要。
		client.commands.set(command.data.name, command);    //読み込んだファイルの"name"を取得、commandの中身をコマンドを格納するCollectionに収納。
	} else {
		console.log(`${filePath} に必要な "data" か "execute" がありません。`);
	}
}

client.on('interactionCreate', async interaction => {       //"interactionCreate"はユーザーが/コマンドを実行したときに発生
	if (!interaction.isChatInputCommand()) return;      //ユーザーが行ったのは/コマンドか、違ったらそのまま終了。

    //interaction.client.commandsで格納されているコマンドを確認、interaction.commandNameは実行されたコマンドの名前、そのコマンドを取得する。
	const command = interaction.client.commands.get(interaction.commandName);
    console.log(interaction.commandName)    //実行されたコマンドのログ

    //もしコマンドが見つからなかったらreturnで関数に戻し終了。
	if (!command) {
		console.error(`${interaction.commandName} が見つかりません。`);
		return;
	}

	try {       //エラーが起きたときのためにtryを使う
		await command.execute(interaction);     //executeを非同期で実行。実行したコードの結果が出るまで下のコードは動かない。
	} catch (error) {
		console.error(error);       //エラーが出た場合は出力。
		await interaction.reply({ content: 'エラーが発生しました。', ephemeral: true });    //エラーが出たことをユーザーに表示。
	}
});

//Botにステータスを追加
client.once(Events.ClientReady, c => {
    client.user.setActivity('やよいさんのお世話Botです！');
});

client.login(process.env.DISCORDBOTTOKEN); //.envからトークンを取得してログイン