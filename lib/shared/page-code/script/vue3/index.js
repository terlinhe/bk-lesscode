/**
 * @desc 根据vue3源码组成返回script内容，预留
 * @param { CodeModel } code
 * @returns { String }
 */

import getImportContent from './import'
import getData from './data'
// import getComputed from './computed'
// import getWatch from './watch'
// import getLifeCycle from './lifeCycle'
import getMethods from './methods'
 
import handleUsedVarAndFunc from './handle-var-and-func'

export default function (code) {
    let scriptContent = ''

    // 处理页面用到的函数跟变量
    handleUsedVarAndFunc(code)

    const importContent = getImportContent(code)
    const dataStr = getData(code)
    // const computedStr = getComputed(code)
    // const watchStr = getWatch(code)
    const methodsStr = getMethods(code)

    scriptContent = `
        ${importContent}
        ${dataStr}
        ${methodsStr}`

    return `<script setup>
            ${scriptContent}
        <\/script>\n`
}
