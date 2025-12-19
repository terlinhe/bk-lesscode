import bkToken from '../conf/token'
import {
    decodeToken
} from '@bkui/apigateway-nodejs-sdk'

export const getUserFromApiGW = async (jwt) => {
    const { user } = await decodeToken(jwt, bkToken)
    if (!user) {
        throw new Error('未解析到用户名，请修改后再试')
    }
    return user
}

export const getTenantIdHeader = () => {
    return {
        'X-Bk-Tenant-Id': process.env.ENV_ENABLE_MULTI_TENANT ? (global.TENANT_ID || 'default') : undefined
    }
}

export const getAuthHeaderWithoutUser = () => {
    return {
        'X-Bk-Tenant-Id': process.env.ENV_ENABLE_MULTI_TENANT ? (process.env.TENANT_ID || 'default') : undefined,
        'X-Bkapi-Authorization': JSON.stringify({
            bk_app_code: bkToken?.bk_app_code,
            bk_app_secret: bkToken?.bk_app_secret
        })
    }
}

export const getAuthHeader = (bkToken) => {
    return {
        'X-Bk-Tenant-Id': process.env.ENV_ENABLE_MULTI_TENANT ? (process.env.TENANT_ID || 'default') : undefined,
        'X-Bkapi-Authorization': JSON.stringify({
            bk_app_code: bkToken?.bk_app_code,
            bk_app_secret: bkToken?.bk_app_secret,
            [global.AUTH_NAME]: bkToken
        })
    }
}
