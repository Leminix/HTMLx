
const fs = require('node:fs')
const oneline = require('readline')

/*=====================================
    import modules from other files
    for create new html file and
    to serve variables
=======================================*/

const create = require('./create')
const varHandling = require('./variables')
const others = require('./others')
const conditionas = require('./conditionals')


let keepreading = true
let conditionalLevel = 0


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


        /*=======================================
                    conditionas
        =========================================*/

        if(line.includes('if-start') && keepreading){
            conditionalLevel++
            if(line.includes('_$')) line = varObj.replacevar(line)
            keepreading = conditionas(line)
        }

        else if(line.includes('if-end')){
            if(conditionalLevel > 0) conditionalLevel--
            if(conditionalLevel == 0) keepreading = true
        }

        /*==========================================
            conditionasl for handling variables
        ============================================*/

        else if(line.includes('$') && keepreading){
            if(line.includes('=')) varObj.variables(line.trim())
            else if(line.includes('_$')) content += varObj.replacevar(line) + "\n"
            else content += others(line)
        }

        /*============================================
        if find something which is not a varable and
        not a conditiona
        ==============================================*/

        else if(keepreading) content += others(line)
        
    })

    /*===============================
     EOF stop reading line by line and
     call create method
    =================================*/

    obj.on('close', () => {
         create(file, content)
    })
}