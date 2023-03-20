export default function (code) {
    let methodsStr = ''
    if (code.pageDataVariables.length) {
        methodsStr += `
            function getInitVariableValue (defaultValue, defaultValueType) {
                let val = defaultValue.all
                if (defaultValueType === 1) val = defaultValue[window.BKPAAS_ENVIRONMENT]
                return val
            }
        `
    }
    return methodsStr
}
