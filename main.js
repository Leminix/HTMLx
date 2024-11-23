/* 
This code is unlicensed, and was writen by only one programmer. The program was made as a hobby and is
intended for own needs.
*/

///////////////////////////
//// import module fs ////
/////////////////////////
const fs = require('node:fs')

/////////////////////////////////
//// import module readline ////
///////////////////////////////
const readline = require('node:readline')

const decisions = require('./components/decisions')

///////////////////////////////////////////////
//// create object for user console input ////
/////////////////////////////////////////////

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})


//////////////////////////////
//// wait for user input ////
////////////////////////////

rl.question('Enter file name> ', (file) => {

    if(file.includes('.htmlx')){

        /////////////////////////////////
        //// read content from file ////
        ///////////////////////////////

        fs.readFile(file,'utf8', (err, data) => {
            if(err){
                
                ///////////////////////////////
                //// print custome error ////
                /////////////////////////////

                throw new Error(err)
                return
            }else{
                decisions(file)

            }
        })
        rl.close()

    }else{
        //////////////////////////////////////////////////////
        //// print error massage about wrong file format ////
        ////////////////////////////////////////////////////

        throw new Error('wrong file format use [FILE].htmlx')
    }


})