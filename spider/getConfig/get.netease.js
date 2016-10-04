// 引入依赖
let cheerio = require('cheerio');
let request = require('request');
let output = require('../output.config.js');

// 获取网易云音乐

// 飙升榜
const HOST = 'http://music.163.com';
const url = `${HOST}/discover`;
let j = request.jar();

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

function handleGetBody(data, receive) {
  let $ = cheerio.load(data);
  let songList = [];
  $('#discover-module .n-bill .n-bilst dl').each(function(index, element) {
    $(this).find('ol li').each(function(i, el) {
      if (!songList[index]) songList[index] = [];
      
      let link = $(this).find('a');
      let song = link.text();
      let url = link.attr('href');
      songList[index].push({
        song,
        songLink: `${HOST}${url}`
      });
    });
  });
  
  let response = {
    songList,
    success: true
  };
  receive(response);
}

module.exports = fetchData;
