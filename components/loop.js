module.exports = function loop(line){

    let repeateContent = ''

    // split line to three parts
    //   0   1   2
    // loop: val: val

    let splitLine = line.split(':')

    for(let i = 1; i <= splitLine[1]; i++){
        repeateContent += splitLine[2] + '\n'
    }

    return repeateContent

}