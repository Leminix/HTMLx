/* 
This code is unlicensed, and was writen by only one programmer. The program was made as a hobby and is
intended for own needs.

declar and define a varoble: $<name>=<value>
call a varible: _$<name>_

conditionals: if-start:<conditional>
                code
              if-end
conditionals can not work with variables

comments: //comment
*/








/*===================
    main code
====================*/
const fs = require('node:fs')
const readline = require('node:readline')


/*=========================================
    import module which compale your code 
===========================================*/
const decisions = require('./components/decisions')

/*============================================
     create object for user console input
==============================================*/

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})


/*===========================
    wait for user input 
    =========================*/

rl.question('Enter file name> ', (file) => {


    /*=================================================================
        check if file html already exist and erace content of file 
    ===================================================================*/

    let check = file.split('.')
    fs.writeFile(`${check[0]}.html`, '', (err) => {
        if(err){
            throw new Error(`${err}. file ${file} cannot be emptied`)
        }
    })

    /*===============================
        check file format and
        if format correct
        call method for compile code
    =================================*/

    if(file.includes('.htmlx')){
        decisions(file)
        rl.close()
    }else{
        /*==================================================
            print error massage about wrong file format
        ====================================================*/

        throw new Error('wrong file format use [FILE].htmlx')
    }
})