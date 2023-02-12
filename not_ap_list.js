"use strict";
// まだAPしていない曲一覧を出力する

// SQLite3導入
const sqlite3 = require("sqlite3");
const db      = new sqlite3.Database("ap_musics.db");

let text = "";

db.all("select * from musics where ap_flg = 0", (err, rows) => {
  rows.forEach(row => {
    text += "『" + row.name + "』\n";
  });

  text += "\n合計" + rows.length + "曲"

  console.log(text);
});
