"use strict";
// APした曲を登録する

// SQLite3導入
const sqlite3 = require("sqlite3");
const db      = new sqlite3.Database("ap_musics.db");

// 別ファイル導入
const def = require("./function");

console.log("APすることが出来た曲をフルで入力してエンターキーを押してください。");

const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on("line", input => {
  const musics = [input];

  db.all("select name, ap_flg" + " from musics", (err, rows) => {
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
              if(results[0]["ap_flg"] === 1){
                console.log(results[0].name + " は既に登録されています！");
              }else{
                db.run("update musics set ap_flg = 1 where name = ?", suggest_music);
                console.log("登録成功：" + suggest_music + "\nAPおめでとうございます♪");
              }
            });
          }else if((min > 1) && (min < 6)){
            console.log("登録に失敗しました......\n\nもしかして　" + suggest_music + "　？");
          }else{
            console.log("登録に失敗しました......\n正しく曲名を**フル**で入力できているか、もしくは**2曲以上入力していないか**確認してください！");
          }
        }else{
          if(rows[0]["ap_flg"] === 1){
            console.log(rows[0].name + " は既に登録されています！");
          }else{
            db.run("update musics set ap_flg = 1 where name = ?", music);
            console.log("登録成功：" + music + "\nAPおめでとうございます♪");
          }
        }
      });
    }
  });

  reader.close();
});
