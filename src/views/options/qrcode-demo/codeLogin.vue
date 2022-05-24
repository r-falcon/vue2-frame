<template>
  <div class="app-container">
    <div class="qrcode">
      <QrCode
        class="img"
        :code="code"
        v-show="codeStatus === 'EXPIRE' || codeStatus === 'UNUSED'"
      />
      <div class="empty" v-show="codeStatus === 'EXPIRE'"></div>
      <div class="refresh" v-show="codeStatus === 'EXPIRE'">
        <i class="refresh_mask"></i>
        <i class="refresh_icon" @click.stop="getToken"></i>
      </div>
      <div class="result" v-show="codeStatus === 'CONFIRMING'">
        <img class="u_avatar" :src="avatar" alt="用户头像" />
        <p class="u_name">{{username}}</p> 
      </div>
      <div>
        <p class="sub_title">{{tip}}</p>
        <p class="sub_desc">扫描登录，更易、更快、更安全</p>
      </div>
    </div>
  </div>
</template>

<script>
import QrCode from "./qr-code";
import store from "@/store";
import { Message } from "element-ui";

export default {
  components: {
    QrCode,
  },
  data() {
    return {
      codeStatus: "EMPTY",
      effectiveSeconds: 60,
      tip: "正在获取登录密码，请稍等",
      code: "",
      avatar: "",
      username: "",
    };
  },
  created(){
    this.getToken()
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    getToken(){
      this.codeStatus = 'EMPTY'
      this.tip = '正在获取登录密码，请稍等'
      this.effectiveSeconds = 60 
      clearInterval(this.timer) 
      GenerateCode('get').then((response) => {
        this.code = `https://cn.bing.com?code=${response.data}`
        this.codeStatus = 'UNUSED'
        this.tip = '请使用手机扫码登录'
        this.timer = setInterval(this.getTokenInfo,2000)
      }).catch(() => {
        this.getToken()
      })
    },

    getTokenInfo(){
      // 二维码过期 
      this.effectiveSeconds--
      if(this.effectiveSeconds <= 0){
        this.codeStatus = 'EXPIRE'
        this.tip = '二维码已过期，请刷新'
        return
      }

      // 轮询查询二维码状态
      CodeInfo('get',params).then((response) => {
        const codeVO = response.data 
        if(!codeVO || !codeVO.codeStatus){
          this.codeStatus = 'EXPIRE'
          this.tip = '二维码已过期，请刷新'
        }
      })

      // 二维码状态正在登录
      if(codeVO.codeStatus === 'CONFIRMING'){
        this.username = codeVO.username 
        this.avatar = codeVO.avatar 
        this.codeStatus = 'CONFIRMING'
        this.tip = '扫码成功，请在手机上确认'
      }

      // 二维码状态为确认登录
      if(codeVO.codeStatus === 'CONFIRMING'){
        clearInterval(this.timer)
        const token = codeVO.token 
        store.commit('setToken',token)
        this.$router.push('/home')
        Message.success('登录成功')
        return
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.qrcode {
  clear: right;
  position: relative;
  text-align: center;
  border: 1px solid #ccc;
}

.qrcode .img {
  display: block;
  width: 200px;
  height: 200px;
  margin: 35px auto 25px;
}

.qrcode .sub_title {
  text-align: center;
  font-size: 19px;
  color: #353535;
  margin-bottom: 23px;
}
.qrcode .sub_desc {
  text-align: center;
  color: #a3a3a3;
  font-size: 14px;
  padding: 0 40px;
  line-height: 1.8;
}
.qrcode .empty {
  display: block;
  width: 200px;
  height: 200px;
  margin: 35px auto 25px;
  background: #d7e8fc;
}
.qrcode .refresh {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 240px;
}
.qrcode .refresh .refresh_mask {
  position: absolute;
  left: 50%;
  top: 55%;
  margin-left: -120px;
  margin-top: -120px;
  width: 240px;
  height: 240px;
  background: #ffffffe0;
}
.qrcode .refresh .refresh_icon {
  position: absolute;
  left: 50%;
  top: 55%;
  margin-left: -48px;
  margin-top: -48px;
  height: 96px;
  width: 96px;
  cursor: pointer;
  background: url("../../../assets/logo/logo.png") no-repeat;
}
.qrcode .refresh .refresh_icon:hover {
  animation: refresh 1s linear infinite;
}
@keyframes refresh {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.qrcode .result {
  display: block;
  width: 240px;
  height: 240px;
  margin: 15px auto 25px;
}
.qrcode .result .u_avatar {
  height: 150px;
  width: 150px;
  margin-top: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px #999;
  -moz-box-shadow: #999 0 2px 10px;
  -webkit-box-shadow: #999 0 2px 10px;
}
.qrcode .result .u_name {
  text-align: center;
  font-size: 19px;
  color: #353535;
  margin-top: 20px;
}
</style>
