export default function (code) {
    let dataStr = ''
    // 将dataObj中的变量拼接成data字符串
    if (Object.keys(code.dataObj).length) {
        console.log(code.dataObj, 'dataobj')
        for (const key in code.dataObj) {
            const renderValue = code.dataObj[key]
            if (renderValue && renderValue.startsWith('getInitVariableValue')) {
                dataStr += `const ${key} = ref(${code.dataObj[key]})\n`
            } else if (key.startsWith('form') && key.endsWith('rules')) {
                dataStr += `const ${key} = reactive(${code.dataObj[key]})\n`
            } else {
                const v = JSON.parse(code.dataObj[key])
                // 根据值的类型，决定使用ref 还是用reactive
                if (typeof v === 'object') {
                    dataStr += `const ${key} = reactive(${renderValue})\n`
                } else {
                    dataStr += `const ${key} = ref(${renderValue})\n`
                }
            }
        }
    }
    return dataStr
}
