const axios = require('axios')
const cheerio = require('cheerio')
const url =`http://company.hqps.com/fanghuo-7.html`
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
  return {
    company: $('h2.g-f-l').text()
  }
}

module.exports = async () => {
  let list = []
  for (let i = 17394; i < 17395; i++) {
    let html = await axios.get(`http://project.hqps.com/detail_${i}.html`).then(res => res.data)
    let item = handlerDetailHtml(html)
    let result = await axios.post('http://project.hqps.com/Home/Project/getContact', {
      id: i
    }, {
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie':'gHm_lvt_4e4a8a8cb0e3cf452e52ec5bed58f27c=1554217741; PHPSESSID=gln3lphl7eed6lo4ua903s0054; project_id=17394; cps_username=288782%7Chqps_288782; myid=8cbu0er5%7Chqps_288782%7C%7C288782; project_login_id=hqps_288782%7C8cbu0er5%7C288782; Hm_lpvt_4e4a8a8cb0e3cf452e52ec5bed58f27c=1554218957',
        'Host': 'project.hqps.com',
        'Origin': 'http://project.hqps.com',
        'Referer': 'http://project.hqps.com/detail_17394.html',
// User-Agent: Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Mobile Safari/537.36
// X-Requested-With: XMLHttpRequest
      }
    })
    console.log(result)
    list = [...list, item]
  }
  return list
}