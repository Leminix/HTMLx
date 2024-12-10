module.exports = function others(line){

    /*=======================
            comments
    =========================*/

    if(line.includes('//')) return ''

    /*=================================
    check if line includes conditionas
    ===================================*/
    
    else if(line.includes('if-start:')) return ''

    else return line + "\n"
}