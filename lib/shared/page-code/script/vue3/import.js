// import { camelCase, camelCaseTransformMerge } from 'change-case'

/**
 * @desc 返回import内容
 * @param { CodeModel } code
 * @returns { String }
 */
export default function (code) {
    let importStr = ''

    // preview 模板preview(previewSingle)不需要引入，已经全局引入
    if (['preview', 'previewSingle'].includes(code.pageType)) return importStr

    importStr += 'import {ref, reactive } from \'vue\''
    return importStr
}
