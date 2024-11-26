
const fs = require('node:fs')
const oneline = require('readline')

/*=====================================
    import modules from other files
    for create new html file and
    to serve variables
=======================================*/

const create = require('./create')
const varHandling = require('./variables')


let keepreading = true
let lineParts = []

module.exports = function decisions(file){

    const obj = oneline.createInterface({
        input: fs.createReadStream(file),
        output: process.stdout,
        terminal: false
    })

    let content = ''

    obj.on('line', (line) => {

        /*===============================================
         object which provides merhods to serve variables 
        =================================================*/

        const varObj = new varHandling()

        lineParts = line.split('')

        /*==========================================
            conditionasl for handling variables
        ============================================*/

        if((lineParts[0] === '$') && keepreading){
            varObj.variables(line)
        }

        else if(line.includes('_$') && keepreading){
            content += varObj.replacevar(line) + "\n"
        }
        
    })

    /*===============================
     EOF stop reading line by line and
     call create method
    =================================*/

    obj.on('close', () => {
         create(file, content)
    })
}