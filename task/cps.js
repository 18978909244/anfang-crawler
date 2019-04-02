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
  let _list = $('.qyxx')
  let list = []
  _list.each(function () {
    list.push({
      company: $(this).find('.qymc').find('a').attr('title'),
      address: null,
      tel: $(this).find('.qq').text().split('（')[1].split('）')[0]
    })
  })
  return list
}

module.exports = async () => {
  let list = []
  for (let i = 1; i < 2; i++) {
    let html = await axios.get(`http://company.cps.com.cn/?&page=${i}`).then(res => res.data)
    let item = handlerDetailHtml(html)
    list = [...list, ...item]
  }
  return list
}