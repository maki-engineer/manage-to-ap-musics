"use strict";
// 間違ってAPに登録してしまった曲を削除する

// SQLite3導入
const sqlite3 = require("sqlite3");
const db      = new sqlite3.Database("ap_musics.db");

console.log("誤ってAPに登録した曲をフルで入力してエンターキーを押してください。");