let splitLine = []
let variablesContent = ''
let variablesStatus = []
let exist = false


class VarMet{

    variables(line){

        if(line.includes('=')){

            splitLine = line.split('=')

            variablesStatus.forEach(e => {
                if(e.name === splitLine[0]){
                    e.value = splitLine[1]
                    exist = true
                }
            })

            if(!exist){
                variablesStatus.push(
                    {
                        name: splitLine[0],
                        value: splitLine[1]
                    }
                )
            }

            splitLine = []
            exist = false
        }
    }

    replacevar(line){
        splitLine = line.split('_')
        variablesContent = line

        let isVarExist = false

        variablesStatus.forEach(e => {
            if(variablesContent.includes(`_${e.name}_`)){
                variablesContent = variablesContent.replace(`_${e.name}_`, e.value)
                isVarExist = true
            }
        })

        if(!isVarExist){
            throw new Error(`variable ${splitLine[1]} is undefined`)
        }

        splitLine = []
        return variablesContent
    }
}

module.exports = VarMet
