const axios = require('axios')
const list_url = `http://www.tpy888.cn/company/list.html`
const cheerio = require('cheerio')
const baidu = require('../baidu')
const iconv = require('iconv-lite')

const _request = url => {
    return new Promise((resolve, reject) => {
        var http = require('https');
        http.get(url, function (res) {
            var length = 0;
            var arr = [];
            res.on("data", function (chunk) {
                arr.push(chunk);
                length += chunk.length;
            });
            res.on("end", function () {
                var data = Buffer.concat(arr, length);
                var change_data = iconv.decode(data, 'gb2312');
                resolve(change_data.toString());
            })
        });
    })
}
const handlerCatHtml = html => {
    let $ = cheerio.load(html)
    let lis = $('.list-box').find('li.list')
    let list = []
    lis.each(function () {
        let href = $(this).find('a.g-f-l').attr('href')
        list.push(href)
    })
    return list
}

const handlerDetailHtml = html => {
    let $ = cheerio.load(html)
    let trs = $('.lh18').find('table').find('tr')
    let tel = null
    let company = null
    trs.each(function () {
        if($(this).find('td').eq(0).text().includes('手机号码：')){
            tel = $(this).find('td').find('img').attr('src')
        }
        if($(this).find('td').eq(0).text().includes('公司名称：')){
            company = $(this).find('td').eq(1).text()
        }
        // if ($(this).td().includes('移动手机：')) {
        //     tel = $(this).text().trim().split('：')[1].split(' ')[0]
        // }
    })
    let single = {
        company,
        tel
    }
    return single
    // let company = $('.contactUs').find('strong').text()
}

module.exports = async () => {
    let list = []
    for (let i = 1; i < 2339; i++) {
        let list_html = await axios.get(list_url + '?page=' + i).then(res => res.data)
        let urls = handlerCatHtml(list_html)
        for(let j=0;j<urls.length;j++){
            let detail_html = await axios.get(urls[j]+'contact/').then(res=>res.data)
            let item = handlerDetailHtml(detail_html)
            // let res = await baidu(item.tel)
            await axios({
                url:item.tel
            },null,{

                'Content-Type':'image/png',
                'Referer':urls[j]+'contact/'
            }).then(console.log)
        }
    }
    return list
}