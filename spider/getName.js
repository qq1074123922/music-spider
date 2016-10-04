let request = require('request');

let nameList = ["苏洪堂"];
// let nameList = ["苏洪堂", "王伟", "张文茂", "张祖俭", "周杰群", "李翼", "金见", "陈宇哲", "曹建栋", "夏翼", "梁汝波", "萧国翘", "何溪汇", "卢子豪", "何佳倍", "刘超", "介静涛", "鲜宇博", "金敬亭", "王烨", "彭作杰", "高元煜", "牛亚柯", "随欣", "刘旭", "侯永胜", "陈玉军", "邢斌斌", "夏绪宏", "张怡", "邓刚", "俞鑫", "李东江", "刘成", "郭鲁川", "熊国梁", "苏冲", "周珣", "乔木", "文赛平", "关丹辉", "杜思良", "谷长胜", "苏俊洋", "宝腾飞", "文林福", "李锴"];

let api = 'https://ee.bytedance.net/malaita/users/?query=';

let output = {};

nameList.forEach(item => {
  let url = api + encodeURIComponent(item);
  let j = request.jar();
  let cookie = request.cookie('OUTFOX_SEARCH_USER_ID_NCOO=1564103990.5397751; ee-session=293dbd1a-d449-4cb2-9029-27f51ae4d6ed; malaita-session-v2=39aebca4-7b45-417e-8d0d-468c4feb155c; _ga=GA1.2.1177262567.1460025110');
  j.setCookie(cookie, url);

  let option = {
    url: url,
    method: 'GET',
    jar: j
  };
  request(option, (err, res, body) => {
    if (err) throw err;
    console.log(body);
  });
});
