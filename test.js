const https = require('https');
// console.log("Test jyut6jyu5");

const text = '粤语'; // 你想要发送的文本内容
const encodedText = encodeURIComponent(text);
// 请求参数
const postData = `text=${encodedText}&type=0&tone_type=1&letter_blank=1&letter_type=0&surname_priority=0`;
// const postData = 'text=%E7%B2%A4%E8%AF%AD&type=0&tone_type=1&letter_blank=1&letter_type=0&surname_priority=0';

// 请求选项
const options = {
  hostname: 'www.iamwawa.cn',
  path: '/home/yuepin/ajax',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

// 发送请求
const req = https.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log('响应头:');
  console.log(res.headers);

  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
    // 打印chunk的类型
    console.log(typeof chunk); // chunk是object类型
    // 打印chunk的内容
    let json_data = JSON.parse(Buffer.from(chunk).toString());
    console.log(json_data.data)
  });

  res.on('end', () => {
    console.log('响应结束');
  });
});

// 发送请求时出错处理
req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入请求主体
req.write(postData);
req.end();