const url = 'http://www.tpy888.cn/extend/image.php?auth=RCN6HwZlVT5tFVI0B2gecW1TJ0JhUidC'
const baidu = require('./baidu1')
const axios = require('axios')
const fs = require('fs')

axios({
    url,
    method: 'get',
    headers: {
        'Content-Type': 'image/png',
        'Referer':'http://zhangduoduo66.tpy888.cn/contact/'
    }
}).then(res=>{
    console.log(res.data)
    // fs.writeFileSync('./base.png',new Buffer(res.data))
    // let data = new Buffer(res.data, 'binary').toString('base64')
    // console.log('data:image/png;base64,'+data)
})