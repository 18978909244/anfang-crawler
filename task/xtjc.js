const axios = require('axios')
const cheerio = require('cheerio')

const URL = `http://m.xtjc.com/company/`


const handlerCatHtml = html => {
    let $ = cheerio.load(html)
    let as = $('.area').find('a')
    let list = []
    as.each(function () {
        list.push($(this).attr('href'))
    })
    return list
}

const handlerDetailHtml = html => {
    let $ = cheerio.load(html)
    let address_reg = /地址：(.*)/
    let tel_reg = /电话：(.*)/
    let address = null
    let tel = null
    try {
        address = $('#nr_box').text().split('地址：')[1].split('\n')[0]
    } catch (e) {

    }
    try {
        tel = $('#nr_box').text().split('电话：')[1].split('\n')[0]
    } catch (e) {

    }


    let single = {
        company: $('#head_l').find('a').text(),
        address,
        tel
    }
    return single
    // let company = $('.contactUs').find('strong').text()
}

module.exports = async () => {
    let list = []
    for (let i = 1; i < 35; i++) {
        let html = await axios.get(`http://www.xtjc.com/company/list-0-${i}-1.html`).then(res => res.data)
        let item = handlerListHtml(html)
        console.log(item)
        // if(item.company){
        //     console.log(i+'，公司名：'+item.company)
        //     list.push(item)
        // }
    }
    return list
}