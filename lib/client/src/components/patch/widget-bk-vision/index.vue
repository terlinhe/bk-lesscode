<template>
  <div class="lesscode-bk-vision-container" :id="renderId">
    <bk-exception v-if="!uid" class="exception-wrap-item exception-part exception-gray" type="404" scene="part">
      <span>请先配置uid</span>
    </bk-exception>
    <div v-else :id="`dashboard-${renderId}`" />
  </div>
</template>

<script>
import { uuid, debounce } from 'shared/util';

export default {
  name: 'widget-bk-vision',
  props: {
    uid: {
      type: String,
      default: ''
    },
    waterMark: {
      type: String
    },
    isFullScroll: {
      type: Boolean,
      default: true
    },
    isShowTools: {
      type: Boolean,
      default: true
    },
    isShowRefresh: {
      type: Boolean,
      default: true
    },
    isShowTimeRange: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      renderId: '',
      apiPrefix: '/api/bkvision/'
    };
  },
  computed: {
    waterMarkContent() {
      const arr = [];
      arr.push(this.waterMark || 'bk-lesscode');
      console.log(arr, 'wahtc');
      return {
        content: arr
      };
    }
  },
  watch: {
    uid(val) {
      this.debounceInit();
    },
    waterMark() {
      this.debounceRender();
    },
    isShowTools() {
      this.debounceRender();
    },
    isShowRefresh() {
      this.debounceRender();
    },
    isShowTimeRange() {
      this.debounceRender();
    }
  },
  created() {
    this.renderId = uuid(6);
  },
  mounted() {
    this.debounceInit = debounce(this.initPanel);
    this.debounceRender = debounce(this.renderPanel);
    if (!window.BkVisionSDK) {
      this.loadSdk();
    } else {
      console.log('bkvision sdk exist');
      this.initPanel();
    }
  },
  methods: {
    loadSdk() {
      const cdnUrl = 'https://staticfile.qq.com/bkvision/p8e3a7f52d95c45d795cb6f90955f2800/latest/';

      const link = document.createElement('link');
      link.href = cdnUrl + 'main.css';
      link.rel = 'stylesheet'
      document.body.append(link);

      const script1 = document.createElement('script');
      const script2 = document.createElement('script');
      const script3 = document.createElement('script');
      script1.src = cdnUrl + 'chunk-vendors.js';
      script2.src = cdnUrl + 'chunk-bk-magic-vue.js';
      script3.src = cdnUrl + 'main.js';
      document.body.append(script1);
      document.body.append(script2);
      document.body.append(script3);
      script3.onload = () => {
        console.log('sdk load');
        this.initPanel();
      };
    },
    initPanel() {
      if (window.BkVisionSDK) {
        console.log({
          apiPrefix: '/api/bkvision/',
          waterMark: this.waterMarkContent,
          isFullScroll: this.isFullScroll,
          isShowTools: this.isShowTools,
          isShowRefresh: this.isShowRefresh,
          isShowTimeRange: this.isShowTimeRange
        });
        console.log(this.uid, 'uid', `#dashboard-${this.renderId}`);
        this.uid && window.BkVisionSDK.init(`#dashboard-${this.renderId}`, this.uid, {
          apiPrefix: '/api/bkvision/',
          waterMark: this.waterMarkContent,
          isFullScroll: this.isFullScroll,
          isShowTools: this.isShowTools,
          isShowRefresh: this.isShowRefresh,
          isShowTimeRange: this.isShowTimeRange
        });
      } else {
        console.error('sdk 加载异常');
      }
    },
    renderPanel() {
      if (window.BkVisionSDK) {
        console.log('render');
      } else {
        console.error('sdk 加载异常');
        this.initPanel();
      }
    }
  }
};
</script>

<style lang="postcss">
.lesscode-bk-vision-container {
  pointer-events: all !important;

  * {
    pointer-events: all !important;
  }
}
</style>
