const axios = require('axios')
const cheerio = require('cheerio')

const URL = `http://www.afzhan.com`

const CAT_URL = `http://www.afzhan.com/st1111111/Contactus.html`


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
    // if(html.includes('$company.CompanyName')){
    //     return false
    // }
    // if(html.includes('<article class="productShow">')){
    //     console.log('1111')
    //     let single={
    //         company:$('h2').text(),
    //         address:$('.supplier').find('dl').eq(4).find('dd').text(),
    //         tel:$('#phone').text()
    //     }
    //     return single
    // }

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
    for (let i = 1; i < 3; i++) {
        // console.log(i)
        try {
            let html = await axios.get(`http://m.afzhan.com/st${i}/contactus.html`).then(res => res.data)
            // console.log(html)
            let item = handlerDetailHtml(html)
            // console.log(item)
            if(item.company){
                console.log(i+'，公司名：'+item.company)
                list.push(item)
            }
            // console.log(item)
        } catch (e) {
            // console.log(e)
            continue
        }
    }
    return list
}