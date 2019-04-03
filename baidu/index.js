const axios = require('axios')
module.exports = async img=>{
    return await axios.post('http://47.106.201.174:8882/api/baidu/ocr?api=general_basic',{
        url: img
    }).then(res=>res.data)
}