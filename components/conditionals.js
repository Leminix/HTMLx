module.exports = function conditionals(line){
    let conSplit = line.split(':')

    if(eval(conSplit[1])) return true
    else return false
}