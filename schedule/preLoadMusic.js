var spider = require('../spider/index');

var loadConfig = [
  {
    type: 'netease',
    options: null
  },
  {
    type: 'qqmusic',
    options: null
  },
  {
    type: 'xiami',
    options: null
  }
];

function preLoadMusic(data) {
  if (!data) {
    data = loadConfig;
  }
  setInterval(function() {
    // 使用nodemon启动脚本时，会watch文件修改并自动重启服务
    data.forEach(item => {
      spider.preLoadData(item.type, item.options);
    });
  }, 1000 * 3);
}

module.exports = preLoadMusic;