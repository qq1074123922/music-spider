let path = require('path');
let fs = require('fs');

let ROOT_PATH = path.resolve(__dirname, '..');
let defaultRoute = path.resolve(ROOT_PATH, 'spider', 'output');

const config = {
  saveFile(route, fileName, data) {
    const finalPath = route || defaultRoute;
    if (!fs.existsSync(finalPath)) {
      fs.mkdir(finalPath, 0777, (err) => {
        if (err) throw err;
        this.appendFile(finalPath, fileName, data);
      });
    } else {
      this.appendFile(finalPath, fileName, data);
    }
  },

  appendFile(finalPath, fileName, data) {
   const filePath = path.resolve(finalPath, fileName);
   fs.writeFile(filePath, data, 'utf-8', (err) => {
     if (err) throw err;
     else console.log('successfully write ' + fileName);
   });
  }
}

module.exports = config;
