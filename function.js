"use strict";

// 全角→半角変換(英数字)
exports.hankakuToZenkaku = function(str){
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

// includes メソッドの派生形
exports.isIncludes = (arr, target) => arr.some(el => target.includes(el))

// 配列の重複チェック
exports.existsSameValue = function(a){
  var s = new Set(a);
  return s.size != a.length;
}

// 配列を昇順に並び替える
exports.compareFunc = (a, b) => a - b

// 文字の類似値チェック
exports.levenshteinDistance = function( str1, str2 ){ 
  var x = str1.length; 
  var y = str2.length; 

  var d = []; 
  for( var i = 0; i <= x; i++ ) { 
      d[i] = []; 
      d[i][0] = i; 
  } 
  for( var i = 0; i <= y; i++ ) { 
      d[0][i] = i; 
  } 

  var cost = 0; 
  for( var i = 1; i <= x; i++ ) { 
      for( var j = 1; j <= y; j++ ) { 
          cost = str1[i - 1] == str2[j - 1] ? 0 : 1; 

          d[i][j] = Math.min( d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost ); 
      }
  }

  return d[x][y];
}

// 配列を分割
exports.sliceByNumber = function(array, number){
  const length = Math.ceil(array.length / number)
  return new Array(length).fill().map((_, i) =>
    array.slice(i * number, (i + 1) * number)
  )
}

// ひらがなをカタカナに変換
exports.hiraToKana = function(str){
  return str.replace(/[\u3041-\u3096]/g, function(match) {
      var chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
  });
}

// 配列シャッフル
exports.shuffle = function([...array]){
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
