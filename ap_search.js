"use strict";
// 指定した曲はAP出来ているか検索するバッチ

// SQLite3導入
const sqlite3 = require("sqlite3");
const db      = new sqlite3.Database("ap_musics.db");

// 別ファイル導入
const def = require("./function");

console.log("APしたか確認したい曲をフルで入力してエンターキーを押してください。");

const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.on("line", input => {
  const musics = [input];

  db.all("select name, ap_flg from musics", (err, rows) => {
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
            db.all("select * from musics where name = ?", suggest_music, (err, rows) => {
              if(rows[0]["ap_flg"] === 1){
                console.log(suggest_music + " は既にAP出来ています！");
              }else{
                console.log(suggest_music + " はまだAP出来ていません！");
              }
            });
          }else if((min > 1) && (min < 6)){
            console.log("曲名を見つけることが出来ませんでした......\n\nもしかして　" + suggest_music + "　？");
          }else{
            console.log("曲名を見つけることが出来ませんでした......\n正しく曲名を**フル**で入力できているか、もしくは**2曲以上入力していないか**どうか確認してみてください！");
          }
        }else{
          if(rows[0]["ap_flg"] === 1){
            console.log(rows[0].name + " は既にAP出来ています！");
          }else{
            console.log(rows[0].name + " はまだAP出来ていません！");
          }
        }
      });
    }
  });

  reader.close();
});
