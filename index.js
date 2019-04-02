const taskList = {
    // afzhan:{
    //     res:'http://www.afzhan.com/'
    // },
    bmlink:{
        res:'https://www.bmlink.com'
    }
}

// const task = require('./task/afzhan')


const start = async ()=>{
    for(let i in taskList){
        console.log(`task ${i} start`)
        let task = require(`./task/${i}`)
        let data = await task()
        // console.log(data)
    }
}

start()