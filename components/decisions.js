///////////////////////////////////////////////////////////////
//// import a module for reading line by line from a file ////
/////////////////////////////////////////////////////////////

const oneline = require('readline')

////////////////////////////////////////////
//// import module for files heandling ////
//////////////////////////////////////////

const fs = require('node:fs')

///////////////////////////////////////////////
//// import module for create a html file ////
/////////////////////////////////////////////

const create = require('./create')



////////////////////////////////////////////////////////////////////////////////
//// this method decisions and sent data from htmlx file to others methods ////
///////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////
    //// this variable includes contents which will be write to a html file ////
    ///////////////////////////////////////////////////////////////////////////

    let content = ''

    let helparray



///////////////////////////////////
//// method expects file name ////
/////////////////////////////////

module.exports = function decisions(file){


    ///////////////////////////////////////////////////////////////////
    //// create an interface for reading line by line from a file ////
    /////////////////////////////////////////////////////////////////

    const obj = oneline.createInterface({
        input: fs.createReadStream(file),
        output: process.stdout,
        terminal: false
    })



    ///////////////////////////////////////////////////
    //// array which contains objects of varibles ////
    /////////////////////////////////////////////////

    let vars = []

    ///////////////////////////////
    //// reading line by line ////
    /////////////////////////////

    obj.on('line', (line) => {
       // console.log(line)

        if(line.includes('<') && line.includes('>') && !(line.includes('_'))){
            //content = `${content} ${line}`
            //content = content.concat(' ', line)
            content += line
        }
        else if(line.includes('$') && line.includes('=')){
            helparray = line.split('=')

            //////////////////////////////////////////////////////////////
            //// into array push object which has var name and value //// 
            ////////////////////////////////////////////////////////////

            vars.push({
                name: helparray[0],
                value: helparray[1].trim()
            })
        }
        else if(line.includes('<') && line.includes('_')){
            let varname = line.split('_')
            content += line
            
            /////////////////////////////////////////////////
            //// find a varible in array and save value ////
            ///////////////////////////////////////////////
           
            vars.forEach(varObj => {
                if (varObj.name === varname[1]) {
                    content = content.replace(`_${varObj.name}_`, varObj.value)
                }
            })
        }
        else{
            content = 'none'
        }

    })
    obj.on('close', () => {
        create(file, content)
    })
}