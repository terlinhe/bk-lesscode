/**
 * Tencent is pleased to support the open source community by making 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
 * Copyright (C) 2017-2018 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import iamModel from '../model/iam'
import { checkInServer } from '../controller/iam'
import { IAM_ACTION } from '../../shared/constant.js'

const Router = require('koa-router')

const { fetchResource, check, myProject, checkNoResources, fetchAuthSubject } = require('../controller/iam')

const router = new Router({
    prefix: '/api/iam'
})

router.use(['/auth-subject'], async (ctx, next) => {
    const id = ['POST', 'PUT', 'DELETE'].includes(ctx.request.method)
        ? (ctx.request.body.id || ctx.request.body.projectId)
        : (ctx.request.query.id || ctx.request.query.projectId)

    const project = await iamModel.queryProjectByCreatorAndProjectId(ctx.session.userInfo.username, id)
    if (!project) {
        ctx.send({
            code: 404,
            message: '项目不存在',
            data: null
        })
        return
    }

    // 需要去权限中心查询是否具有 manage_app 权限
    const iamRes = await checkInServer(ctx, String(id), [IAM_ACTION.manage_app[0]])
    // manage_app 无权限
    if (!iamRes[IAM_ACTION.manage_app[0]]) {
        ctx.send({
            code: 403,
            message: '没有权限，请去权限中心申请权限',
            data: {
                pass: false,
                applyUrl: iamRes.applyUrl,
                requiredPermissions: iamRes.requiredPermissions,
                permissionType: 'page'
            }
        })
        return
    }
    await next()
})

router.post('/resource', fetchResource)
router.post('/check', check)
router.get('/my-project', myProject)
router.post('/check-no-resources', checkNoResources)
router.post('/auth-subject', fetchAuthSubject)

module.exports = router
