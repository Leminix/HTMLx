
let splitLine = []
let variablesContent = ''
let variablesStatus = []


class VarMet{

    variables(line){

        if(line.includes('=')){

            splitLine = line.split('=')

            variablesStatus.push(
                {
                    name: splitLine[0],
                    value: splitLine[1]
                }
            )

            splitLine = []
        }
    }

    replacevar(line){
        splitLine = line.split('_')
        variablesContent = line

        let isVarExist = false

        variablesStatus.forEach((e) => {
            if(e.name === splitLine[1]){
                variablesContent = variablesContent.replace(`_${e.name}_`, e.value)
                isVarExist = true
            }
        })

        if(!isVarExist){
            throw new Error(`variable ${splitLine[1]} is undefined`)
            return
        }

        splitLine = []
        return variablesContent
    }
}

module.exports = VarMet
