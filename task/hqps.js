const axios = require('axios')
const cheerio = require('cheerio')
const baidu = require('../baidu')
const URL = `http://company.hqps.com/`
const handlerListHtml = html => {
  let $ = cheerio.load(html)
  let navs = $('.box_nav').find('.nav_b')
  let item = []
  navs.each(function () {
    item.push($(this).find('a').attr('href'))
  })
  return item
}

const handlerItemlHtml = html => {
  let $ = cheerio.load(html)
  let list = []
  $('h3.g-f-l').each(function(){
    list.push({
      company:$(this).find('a').text(),
      url:$(this).find('a').attr('href')
    })
  })
  return list
}

const handlerDetailHtml = html=>{
  let $ = cheerio.load(html)
  let img = null
  $('.hy_xx li').each(function(){
    let text = $(this).text()
    if(text.includes('手机号码')){
      img = $(this).find('img').attr('src')
    }
    // console.log(text)
    // let html = _this.html()
    // if(html.includes('：')){
    //   img = _this.find('img').attr('src')
    // }
  })
  return img
}

module.exports = async () => {
  let list = []
  let html = await axios.get(URL).then(res => res.data)
  let urls = handlerListHtml(html)
  for (let i = 0; i < urls.length; i++) {
    for (let j = 1; j < 50; j++) {
      let url = urls[i].replace('.html', '-' + j + '.html')
      let itemHtml = await axios.get(url).then(res=>res.data)
      let item = handlerItemlHtml(itemHtml)
      for(let z=0;z<item.length;z++){
        let detailHtml = await axios.get(item[z].url).then(res=>res.data)
        let img = handlerDetailHtml(detailHtml)
        let res = await baidu(img)
        let single= {
          company:item[z].company,
          tel:res.words_result[0].words
        }
        console.log(single)
      }
      
    }
  }

  return list
}