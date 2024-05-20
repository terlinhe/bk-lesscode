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
import {
    LCDataService,
    TABLE_FILE_NAME
} from '../service/common/data-service'
import {
    Controller,
    Post,
    Get,
    BodyParams,
    HeaderParams,
    OutputJson,
    QueryParams,
    ProjectAuthorization
} from '../decorator'

@Controller('/api/saas-operate-log')
export default class SaasOperateLogController {
    //模块列表
    @OutputJson()
    @ProjectAuthorization({})
    @Get('/getLogList')
    async getLogList (
        @HeaderParams({ name: 'x-project-id', require: true }) projectId,
        @QueryParams({ name: 'moduleId', require: true }) moduleId
    ) {
        const { list } = await LCDataService.get({
            tableFileName: TABLE_FILE_NAME.SAAS_OPERATE_LOG,
            query: {
                projectId,
                moduleId
            }
        })
        return list
    }

    // 创建模块
    @OutputJson()
    @ProjectAuthorization({})
    @Post('/createLog')
    async createLog (
        @HeaderParams({ name: 'x-project-id', require: true }) projectId,
        @BodyParams() params
    ) {
        Object.assign(params, { projectId })
        const id = await LCDataService.add(TABLE_FILE_NAME.SAAS_OPERATE_LOG, params)
        return id
    }
}