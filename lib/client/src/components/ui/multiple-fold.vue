<template>
    <div v-if="showFullContent">
        {{content}}
        <div class="ellipsis-btn" @click="showFullContent = false">{{closeText}}</div>
    </div>
    <div v-else class="mm-ellipsis-container">
      <div class="shadow">
        <textarea class="ell-textarea" :rows="rows" readonly></textarea>
        <div class="shadow-box" ref="box">
          {{ showContent }}
          <slot name="ellipsis">
            {{ ellipsisText }}
            <span class="ellipsis-btn">{{ openText }}</span>
          </slot>
          <span ref="tail"></span>
        </div>
      </div>
      <div class="real-box">
        {{ showContent }}
        <slot name="ellipsis" v-if="textLength < content.length">
          {{ ellipsisText }}
          <div class="ellipsis-btn" @click="() => { showFullContent = true }">{{ openText }}</div>
        </slot>
      </div>
    </div>
  </template>
  
<script>
  
  export default {
    props: {
      content: {
        type: String,
        default: ''
      },
      openText: {
        type: String,
        default: '更多'
      },
      openText: {
        type: String,
        default: '收起'
      },
      ellipsisText: {
        type: String,
        default: '...'
      },
      rows: {
        type: Number,
        default: 3
      }
    },
    data () {
      return {
        showFullContent: false,
        textLength: 0,
        beforeRefresh: null,
        boxWidth: 0,
        boxHeight: 0
      }
    },
    computed: {
      showContent () {
        const length = this.beforeRefresh ? this.content.length : this.textLength
        return this.content.substr(0, this.textLength)
      },
      watchData () {
        return [this.content, this.rows]
      }
    },
    watch: {
      watchData: {
        immediate: true,
        handler () {
          this.refresh()
        }
      },
    },
    methods: {
      refresh () {
        this.beforeRefresh && this.beforeRefresh()
        let stopLoop = false
        this.beforeRefresh = () => stopLoop = true
        this.textLength = this.content.length
        const checkLoop = (start, end) => {
          if (stopLoop || start + 1 >= end) {
            this.beforeRefresh = null
            return
          }
          const boxRect = this.$refs.box.getBoundingClientRect()
          const tailRect = this.$refs.tail.getBoundingClientRect()
          const overflow = tailRect.bottom > boxRect.bottom
          overflow ? (end = this.textLength) : (start = this.textLength)
          this.textLength = Math.floor((start + end) / 2)
          this.$nextTick(() => checkLoop(start, end))
        }
        this.$nextTick(() => checkLoop(0, this.textLength))
      },
      clickBtn (event) {
        console.log('收起')
      },
    }
  }
  </script>
  
<style lang="postcss" scoped>
    .mm-ellipsis-container {
        text-align: left;
        position: relative;
        line-height: 1.5;
        .shadow {
            width: 100%;
            display: flex;
            pointer-events: none;
            opacity: 0;
            user-select: none;
            position: absolute;
            outline: green solid 1px;
        }
        .ell-textarea {
            border: none;
            flex: auto;
            padding: 0;
            resize: none;
            overflow: hidden;
            font-size: inherit;
            line-height: inherit;
            outline: none;
        }
        .shadow-box {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
    .ellipsis-btn {
        cursor: pointer;
        color: #3a84ff;
    }
</style>