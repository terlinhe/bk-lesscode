import v3Config from '../../conf/v3'
import http from '../../utils/http'
import { getAuthHeader } from './v3-service'

/**
 * 生成token，用于和apigateway交互
 */
export const generateToken = async (bkTikcet, appCode) => {
    const headerKey = global.AUTH_NAME === 'bk_ticket' ? 'X-USER-BK-TICKET' : 'X-USER-BK-TOKEN'
    const authHeader = getAuthHeader(bkTikcet)
    const reData = await http.get(
        `${v3Config.URL_PREFIX}/bkapps/applications/${appCode}/oauth/token/lesscode/`,
        {
            headers: {
                [headerKey]: bkTikcet,
                ...authHeader
            }
        }
    )
    if (!reData.access_token) throw new Error(reData.message || global.i18n.t('生成 Token 失败'))
    return reData.access_token
}
