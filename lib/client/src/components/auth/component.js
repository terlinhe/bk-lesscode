/*
 * Tencent is pleased to support the open source community by making BK-JOB蓝鲸智云作业平台 available.
 *
 * Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * BK-JOB蓝鲸智云作业平台 is licensed under the MIT License.
 *
 * License for BK-JOB蓝鲸智云作业平台:
 *
 * ---------------------------------------------------
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
 * to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
*/

// import PermissionCheckService from '@service/permission-check'
import { permissionDialog } from '@/common/bkmagic'

import './style.css'

export default {
    props: {
        permission: {
            type: [Boolean, String],
            default: ''
        },
        // ACTION_ID
        auth: {
            type: String,
            required: true
        },
        // 没有 resourceId 时，说明没有关联资源
        resourceId: {
            type: [
                Number, String
            ]
        }
    },
    data () {
        return {
            hasPermission: false
        }
    },
    computed: {
        showRaw () {
            if (this.permission) {
                return true
            }
            if (this.hasPermission) {
                return true
            }
            return false
        }
    },
    watch: {
        resourceId (resourceId) {
            if (!resourceId) {
                return
            }
            this.checkPermission()
        }
    },
    created () {
        this.checkPermission()
        this.authResult = {}
    },
    methods: {
        /**
         * @desc 主动鉴权，指定资源和资源权限
        */
        async fetchPermission () {
            try {
                const resData = await this.$store.dispatch('iam/check', {
                    data: {
                        action: this.auth,
                        resourceId: this.resourceId
                    }
                })
                this.hasPermission = resData.pass
                this.authResult = resData
            } catch (e) {
                console.error(e)
            }
        },
        /**
         * @desc 判断预鉴权逻辑
        */
        checkPermission () {
            if (this.permission === '' && this.auth) {
                this.fetchPermission()
            }
        },
        /**
         * @desc 无权限时弹框提示资源权限申请
        */
        handleCheckPermission (e) {
            this.$emit('before-show-permission-dialog', e)
            permissionDialog({
                action: this.auth,
                resourceId: this.resourceId
            }, this.authResult)
            this.$emit('after-show-permission-dialog', e)
        }
    },

    render (h) {
        if (this.showRaw) {
            if (this.$slots.default) {
                return this.$slots.default[0]
            }
            // 多个 slot 嵌套时，拿不到 default，需要指明具名 slot
            if (this.$slots.allow) {
                return this.$slots.allow[0]
            }
        }
        if (this.$slots.forbid) {
            const cls = {
                'component-permission-disabled': true
            }
            const customContainerCls = (this.$slots.forbid[0] || {}).data.attrs['custom-forbid-container-cls']
            if (customContainerCls) {
                cls[customContainerCls] = true
            }
            return h('div', {
                class: cls,
                on: {
                    click: this.handleCheckPermission
                },
                directives: [
                    {
                        name: 'cursor'
                    }
                ]
            }, this.$slots.forbid)
        }
        return this._e() // eslint-disable-line no-underscore-dangle
    }
}
