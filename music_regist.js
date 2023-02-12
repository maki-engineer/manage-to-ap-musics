"use strict";
// 新しく出てきた曲を追加する

// もし出来そうだったらTwitterのapiを使用して自動で追加できるようにしてみたい
// 無理なら手動で曲名をフルで入力して登録

// SQLite3導入
const sqlite3 = require("sqlite3");
const db      = new sqlite3.Database("ap_musics.db");

console.log("新しく追加された曲をフルで入力してエンターキーを押してください。");

const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on("line", input => {
  db.run("insert into musics(name) values(?)", input);
  console.log("追加成功： " + input);

  reader.close();
});
