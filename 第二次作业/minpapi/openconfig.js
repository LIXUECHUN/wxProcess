const titbit = require("titbit");
const crypto = require("crypto");

var app = new titbit();
var {router} = app;

router.get('/wxmsg',async c =>{
    var token = 'msgtalk';

    var urlargs =[
        c.query.nonce,//随机数

        c.query.timestamp,//时间戳

        token
    ];

    urlargs.sort();//字典顺序

    var onestr = urlargs.join('');//拼接成一个字符串

    var sha1 = crypto.createHash('sha1');

    var sign = sha1.update(onestr);//设置要进行加密处理的数据

    if(sign.digest('hex') === c.query.signature){
        c.res.body = c.query.echostr;
    }
});
app.run(8001,'localhost');

