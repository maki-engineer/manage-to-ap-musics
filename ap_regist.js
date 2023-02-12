"use strict";
// APした曲を登録する

// SQLite3導入
const sqlite3 = require("sqlite3");
const db      = new sqlite3.Database("ap_musics.db");

console.log("APすることが出来た曲をフルで入力してエンターキーを押してください。");

const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on("line", input => {
  //

  reader.close();
});
