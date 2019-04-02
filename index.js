const taskList = {
    // afzhan:{
    //     res:'http://www.afzhan.com'
    // },
    // bmlink:{
    //     res:'https://www.bmlink.com'
    // },
    // cps:{
    //     res:'http://www.cps.com.cn'
    // }
    hqps:{
        res:'http://www.hqps.com'
    }
}

// const task = require('./task/afzhan')


const start = async ()=>{
    let all = []
    for(let i in taskList){
        console.log(`task ${i} start`)
        let task = require(`./task/${i}`)
        let data = await task()
        all = [...all,...data.map(item=>{
            return Object.assign(item,{
                res:taskList[i].res
            })
        })]
    }
    console.log(all)
}

start()