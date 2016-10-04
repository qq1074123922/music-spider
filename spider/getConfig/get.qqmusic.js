// 引入依赖
let cheerio = require('cheerio');
let request = require('request');
let output = require('../output.config.js');

// 获取网易云音乐

const HOST = 'http://i.y.qq.com';
const SINGER_URL = 'http://y.qq.com/portal/singer/';
const SONG_URL = 'http://y.qq.com/portal/song/';
// 巅峰榜·内地
const song_begin = 0;
const song_num = 30;
let query = `?tpl=3&page=detail&date=2016_28&topid=5&type=top&song_begin=${song_begin}&song_num=${song_num}`;
query += `&g_tk=2055711317&jsonpCallback=MusicJsonCallbacktoplist&loginUin=245987239&hostUin=0`;
query += `&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0;`

const url = `${HOST}/v8/fcg-bin/fcg_v8_toplist_cp.fcg${query}`;

const requestOption = {
  url: url,
  method: 'GET'
};

function fetchData(receive) {
  request(requestOption, (err, res, body) => {
    if (err) throw err;
    handleGetBody(body, receive);
  });
}

function handleGetBody(callbackStr, receive) {
  // jsonp回调一个函数
  const ptn = /(\{.*\})/gi;
  const data = JSON.parse(callbackStr.match(ptn)[0]);

  let songList = data.songlist || [];
  songList = songList.map(({ data: song }) => ({
    singer: song.singer[0].name,
    singerLink: `${SINGER_URL}${song.singer[0].mid}.html`,
    song: song.songorig,
    songLink: `${SONG_URL}${song.strMediaMid}.html`
  }));
  
  let response = {
    songList,
    success: true
  };
  receive(response);
}

module.exports = fetchData;
