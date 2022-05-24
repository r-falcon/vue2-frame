<template>
  <div class="app-container">
  <!-- 
    网页数据更新问题：
    1.轮询：短轮询（设定访问频率，定时向服务器发送请求，会给服务器带来巨大压力）、长轮询（客户端和服务器一直保持阻塞连接，服务器程序中加一个死循环，当变动时，输出给浏览器并断开，浏览器再次发起请求进入下一个周期）
    2.长连接方式，SSE：允许服务推送数据到客户端。不需要客户端发起请求，服务器端有更新马上发送给客户端
    3.websocket：实现服务器与客户端全双工通信，可以互相发送数据，不存在请求和响应的区别
   -->
   websocket 测试用例
   返回数据：{{user}}
   <el-button @click="handleClose">关闭websocket连接</el-button>
  </div>
</template>

<script>
import {connectWebsocket,closeWebsocket} from '@/utils/websocket'

export default {
  data(){
    return{
      websocketUrl:'ws://127.0.0.1:8001',
      user:{}
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      this.beginWebScoket(() => {
        // 注意这里的连接需要node.js后台对其有同步的设置
        connectWebsocket(this.websocketUrl,{name:'falcon',age:20},(data) => {
          console.log(data);
          this.user = JSON.parse(data)
        })
      })
    },

    beginWebScoket(initScoket){
      initScoket()
    },

    handleClose(){
      closeWebsocket()
    }
  }
}
</script>