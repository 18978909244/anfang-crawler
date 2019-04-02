const axios = require('axios')
const request = require('request')
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
                var data=Buffer.concat(arr,length);
                var change_data = iconv.decode(data,'gb2312');
                resolve(change_data.toString());
            })
        });
    })
}
const cheerio = require('cheerio')
const handlerCatHtml = html => {
    let $ = cheerio.load(html)
    let lis = $('.m-company').find('li')
    let list = []
    lis.each(function () {
        let href = $(this).find('a.cot-name').attr('href')
        list.push(href)
    })
    return list
}

const handlerDetailHtml = html => {
    let $ = cheerio.load(html)
    let ps = $('.tabContact').find('p')
    let tel = null
    let address = null
    ps.each(function(){
        if($(this).text().includes('移动手机：')){
            tel = $(this).text().trim().split('：')[1].split(' ')[0]
        }
    })
    let single = {
        company: $('h1').text(),
        address,
        tel
    }
    return single
    // let company = $('.contactUs').find('strong').text()
}

module.exports = async () => {
    let cat_html = await axios.get('https://www.bmlink.com/zt/573135/cj.html').then(res => res.data)
    let urls = handlerCatHtml(cat_html)
    let list = []
    for (let i = 0; i < 10; i++) {
        let url = urls[i].split('.')[0].split('//')[1]
        let html = await _request(`https://m.bmlink.com/${url}/`)
        console.log(`https://m.bmlink.com/${url}/`)
        let item = handlerDetailHtml(html)
        list.push(item)
    }
    return list
}