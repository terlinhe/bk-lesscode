<template>
    <div v-if="isShow" class="saas-operate-log-container">
        <div class="log-header">
            <span class="log-title">{{$t('操作记录')}}</span>
            <i @click="() => emit('close')" class="bk-drag-icon bk-drag-close-small"></i>
        </div>
        <div class="log-content">
            <template v-for="log in logList">
                <div class="log-item">
                    <span class="log-status">
                        <svg v-if="log.status === 'running'" fill="#3a84ff" aria-hidden="true" width="10" height="10" class="loading-rotate">
                            <use xlink:href="#bk-drag-loading-2"></use>
                        </svg>
                        <i v-else class="bk-drag-icon bk-drag-circle-shape log-icon" :class="[`status-${log.status}`]"></i>
                    </span>
                    <div class="log-detail">
                        <div class="log-time">{{log.createTime}}</div>
                        <div class="log-user-result">
                            <span>{{`${log.createUser} ${getTypeText(logoperateType)}`}}, </span>
                            <span :class="[`status-${log.status}`]">{{getStatusText(log.status)}}</span>
                        </div>
                        <div>
                            <div class="content-diff" v-if="logoperateType === 'UPDATE_STORY'">
                                <div class="content-area left">
                                    <p class="diff-title">{{$t('修改后')}}</p>
                                    <div class="content-div">
                                        <ellipsis
                                            class="ellipsis-content"
                                            :content="log.payloadData.con"
                                            :rows="6"
                                        >
                                        </ellipsis>
                                    </div>
                                </div>
                                <div class="content-area right">
                                    <p class="diff-title">{{$t('修改前')}}</p>
                                    <div class="content-div">
                                        <ellipsis
                                            class="ellipsis-content"
                                            :content="log.payloadData.prevCon"
                                            :rows="6"
                                        >
                                        </ellipsis>
                                    </div>
                                </div>
                            </div>
                            <div class="content-show" v-else>
                                <ellipsis
                                    class="ellipsis-content"
                                    :content="log.payloadData.con"
                                    :rows="6"
                                >
                                </ellipsis>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import { ref, shallowRef, onBeforeMount } from '@vue/composition-api'
    import { useStore } from '@/store'
    import Ellipsis from '@/components/ui/multiple-fold'

    export default {
        components: {
            Ellipsis,
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            }
        },
        setup (props, { emit }) {
            const store = useStore()

            const logList = shallowRef([])

            onBeforeMount(async () => {
                // const list = await store.dispatch()
                logList.value = [
                    {
                        operateType: 'UPDATE_STORY',
                        status: 'success',
                        createTime: '2024-04-26 12:30:00',
                        createUser: 'admin',
                        payloadData: {
                            con: '修改后内容233333',
                            prevCon: '修改前内容11111'
                        }
                    },
                    {
                        operateType: 'UPDATE_STORY',
                        status: 'running',
                        createTime: '2024-04-25 13:30:00',
                        createUser: 'admin',
                        payloadData: {
                            con: '修改后内容233333修改后内容233333修改后内容233333修改后内容233333修改后内容233333',
                            prevCon: '修改前内容11111'
                        }
                    },
                    {
                        operateType: 'ADD_STORY',
                        status: 'failed',
                        createTime: '2024-04-25 13:30:00',
                        createUser: 'admin',
                        payloadData: {
                            con: '新增内容233333',
                        }
                    }
                ]
            })

            function getTypeText (type) {
                let str = ''
                if (type === 'UPDATE_STORY') {
                    str = window.i18n.t('修改需求')
                } else if (type === 'UPDATE_TASK') {
                    str = window.i18n.t('修改子任务')
                } else if (type === 'ADD_STORY') {
                    str = window.i18n.t('新增需求')
                }
                return str
            }

            function getStatusText (status) {
                let str = ''
                if (status === 'failed') {
                    str = window.i18n.t('执行失败')
                } else if (status === 'success') {
                    str = window.i18n.t('执行成功')
                } else if (status === 'running') {
                    str = window.i18n.t('执行中')
                }
                return str
            }
            return {
                emit,
                logList,
                getTypeText,
                getStatusText
            }
        }
    }
</script>

<style lang="postcss" scoped>
    .saas-operate-log-container {
        background-color: #fff;
        border: 1px solid #dcdee5;
        border-top: 0;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        width: 550px;
        z-index: 2018;
        .log-header {
            height: 52px;
            padding: 0 16px 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: inset 0 -1px 0 0 #DCDEE5;
            .log-title {
                font-size: 16px;
                color: #313238;
                line-height: 24px;
            }
            .bk-drag-close-small {
                cursor: pointer;
                font-size: 20px;
            }
        }
        .log-content {
            padding: 24px;
            .status-success {
                color: #2dcb56;
            }
            .status-failed {
                color: #ea3636;
            }
            .status-running {
                color: #3a84ff;
            }
            .loading-rotate {
                animation: icon-loading 1.5s linear infinite;
            }
            .log-item {
                display: flex;
                position: relative;
                &:not(:last-child)::after {
                    content: "";
                    position: absolute;
                    height: calc(100% - 24px);
                    width: 1.5px;
                    background: #D8D8D8;
                    top: 22px;
                    left: 4px;
                    z-index: 1;
                }
                .log-status {
                    height: 22px;
                    display: flex;
                    align-items: center;
                    .log-icon {
                        font-size: 9px;
                    }
                }
                .log-detail {
                    margin-left: 12px;
                    font-size: 12px;
                    .log-time {
                        line-height: 22px;
                        color: #63656E;
                    }
                    .log-user-result {
                        line-height: 20px;
                        color: #313238;
                        margin: 4px 0 8px;
                    }
                    .content-diff {
                        display: flex;
                        justify-content: space-between;
                        .content-area {
                            width: 240px;
                            margin-bottom: 24px;
                            color: #63656E;
                            border-radius: 2px;
                            padding: 14px 8px 12px 12px;
                        }
                        .diff-title {
                            font-weight: 700;
                            color: #313238;
                            margin-bottom: 8px;
                        }
                        .left {
                            background-color: #F5F7FA;
                            margin-right: 1px;
                        }
                        .right {
                            background-color: #F0F1F5;
                        }
                    }
                    .content-show {
                        width: 480px;
                        background: #F5F7FA;
                        border-radius: 2px;
                        padding: 8px 12px;
                        margin-bottom: 24px;
                    }
                    .content-div {
                       
                    }
                }
                
            }
        }
    }
</style>