"use strict";
// 間違ってAPに登録してしまった曲を削除する

// SQLite3導入
const sqlite3 = require("sqlite3");
const db      = new sqlite3.Database("ap_musics.db");

// 別ファイル導入
const def = require("./function");

console.log("誤ってAPに登録した曲をフルで入力してエンターキーを押してください。");

const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on("line", input => {
  const musics = [input];

  db.all("select name, ap_flg from musics", (err, rows) => {
    // コマンドを打ってきた人がまだカラムを登録してなかったらapコマンド使うように警告
    let min   = 0xFFFF;
    let suggest_music = "";

    for(let row of rows){
        if(min > def.levenshteinDistance(def.hiraToKana(musics[0]).toUpperCase(), def.hiraToKana(row.name).toUpperCase())){
            min   = def.levenshteinDistance(def.hiraToKana(musics[0]).toUpperCase(), def.hiraToKana(row.name).toUpperCase());
            suggest_music = row.name;
        }
    }

    for(let music of musics){
      db.all("select * from musics where name = ?", music, (err, rows) => {
        if(rows.length === 0){
          if(min <= 1){
            db.all("select * from musics where name = ?", suggest_music, (err, results) => {
              if(results[0]["ap_flg"] === 0){
                console.log(results[0].name + " はまだAP曲データに登録されていないようです。");
              }else{
                db.run("update musics set ap_flg = 0 where name = ?", suggest_music);
                console.log("取り消し成功：" + suggest_music);
              }
            });
          }else if((min > 1) && (min < 6)){
            message.reply("取り消しに失敗しました......\n\nもしかして　" + suggest_music + "　？");
          }else{
            console.log("取り消しに失敗しました......\n正しく曲名を**フル**で入力できているか、もしくは**2曲以上入力していないか**確認してください！");
          }
        }else{
          if(rows[0]["ap_flg"] === 0){
            console.log(rows[0].name + " はまだAP曲データに登録されていないようです。");
          }else{
            db.run("update musics set ap_flg = 0 where name = ?", music);
            console.log("取り消し成功：" + music);
          }
        }
      });
    }
  });

  reader.close();
});
