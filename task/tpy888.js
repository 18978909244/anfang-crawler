const axios = require('axios')
const http = require('http')

const request = (url)=>{
    return new Promise(())
}
const cheerio = require('cheerio')
axios.interceptors.request.use(function (request) {
    request['headers']['common']['Accept'] = 'application/json;charset=GBK;';
    return request;
  }, function (error) {
    return Promise.reject(error);
  });
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
    console.log(html)
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

    // let address_reg = /地址：(.*)/
    // let tel_reg = /电话：(.*)/
    // let address = null
    // let tel = null
    // try {
    //     address = $('#nr_box').text().split('地址：')[1].split('\n')[0]
    // } catch (e) {

    // }
    // try {
    //     tel = $('#nr_box').text().split('电话：')[1].split('\n')[0]
    // } catch (e) {

    // }


    let single = {
        company: $('h1').html(),
        // address,
        // tel
    }
    return single
    // let company = $('.contactUs').find('strong').text()
}

module.exports = async () => {
    let cat_html = await axios.get('https://www.bmlink.com/zt/573135/cj.html').then(res => res.data)
    let urls = handlerCatHtml(cat_html)
    // console.log(urls)
    for (let i = 0; i < urls.length; i++) {

        let html = await axios.get('https:' + urls[i]).then(res => res.data)
        // let reader = new FileReader();
        // reader.readAsText(html, 'GBK');
        // reader.onload = function (e) {
        //     console.log(reader.result);
        // }
        // console.log(html)
        let item = handlerDetailHtml(html)
        console.log(item)
    }
    return list
}