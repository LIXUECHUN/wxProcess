// 处理用户消息的模块，后期拓展时，比较方便
const formatMsg = require('./fmtwxmsg');

function help() {
    return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
}

//处理用户发过来的消息，
// 第一个参数是解析后的用户消息
// 第二个参数是要返回的消息对象
// 基本处理过程，根据用户发过来的消息判断消息类型并进行处理
function userMsg(wxmsg, retmsg) {
    /*
        检测是否为文本消息，如果是文本消息，则先要检测是不是支持的关键词回复。
    */
    if (wxmsg.MsgType == 'text') {
        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){
            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else if(wxmsg.Content == 'who'){
            retmsg.msg = '姓名：李雪纯 \n学号:2017011700\n';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        } else {
            // 非关键词原样返回消息
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {
        //非文本类型的处理
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}

exports.userMsg = userMsg;
exports.help = help;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

