"use strict";
// 指定した曲はAP出来ているか検索するバッチ

// SQLite3導入
const sqlite3 = require("sqlite3");
const db      = new sqlite3.Database("ap_musics.db");

console.log("APしたか確認したい曲をフルで入力してエンターキーを押してください。");