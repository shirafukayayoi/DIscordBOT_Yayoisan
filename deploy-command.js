const dotenv = require('dotenv');   // dotenvを使うためのコード
dotenv.config();                    // .envファイルの内容を読み込む

// 読み込まれているかの確認
console.log('TOKEN:', process.env.DISCORDBOTTOKEN);
console.log('CLIENT_ID:', process.env.DISCORDBOTCLIENTID);
console.log('GUILD_ID:', process.env.GUILD_ID);

const { REST, Routes } = require('discord.js'); // discord.jsから5
const fs = require('node:fs');  // ファイルを読み込むために必要なコード5

const commands = [];    //ここに変数をいれるための容器の作成
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));     //"commands"ファイルの中に.jsの拡張子のファイルを探すコード
5
for (const file of commandFiles) {      //.jsのファイルを順番に取り出す。
    const command = require(`./commands/${file}`);      //commandsの中にあるファイルの名前を{file}の中に入れて呼び出す。
    console.log(file)
    commands.push(command.data.toJSON());       //取り出したファイルの中にある"data"をJSON形式にする。
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORDBOTTOKEN);  // 環境変数からトークンを取得

(async () => {      //非同期関数の定義
    try {       //tryの中でエラーが発生したらcatchに飛ぶ
        console.log(`${commands.length} 個のアプリケーションコマンドを登録します。`);

        const data = await rest.put(    //
        Routes.applicationCommands(process.env.DISCORDBOTCLIENTID),  // .envからクライアントIDとギルドIDを取得、エンドポイントの作成。
        { body: commands },     //commandsの変数の中にある情報をエンドポイントに渡す。
    );

        console.log(`${data.length} 個のアプリケーションコマンドを登録しました。`);
    } catch (error) {
        console.error(error);   //エラーが発生した場合は表示
    }
})();
