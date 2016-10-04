const output = require('./output.config.js');

module.exports = {
  getInfo: (type, options, receive) => {
    try {
      let data = require(`./output/${type}.json`);
      receive(data);
    } catch(err) {
      receive({ err: '无法找到请求的路径' });
    }
  },
  preLoadData: (type, options) => {
    try {
      let fetchData = require(`./getConfig/get.${type}.js`);
      fetchData((response) => {
        output.saveFile(null, `${type}.json`, JSON.stringify(response));
      });
    } catch(err) {
      console.log('无法找到请求的路径');
    }
  }
};
