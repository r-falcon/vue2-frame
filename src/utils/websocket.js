// websocket实例
let wsObj = null 
// ws连接地址
let wsUrl = null 
// 是否执行重连，true不执行，false执行
let lockReconnect = false 
// 重连定时器
let wsCreateHandler = null 
// 连接成功，执行回调函数
let messageCallback = null 
// 连接失败，执行回调函数
let errorCallback = null 
// 发送给后台的数据 
let sendDatas = {}

/**
 * 发起websocket请求函数
 * @param {string} url ws连接地址
 * @param {Object} agentData 传给后台的参数
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export const connectWebsocket = (url, agentData, successCallback, errCallback) => {
  wsUrl = url 
  createWebSoket()
  messageCallback = successCallback
  errorCallback = errCallback 
  sendDatas = agentData
}

// 手动关闭websocket(手动关闭会执行onclose事件)
export const closeWebsocket = () => {
  if (wsObj) {
    writeToScreen('手动关闭websocket')
    wsObj.close()
    // wsObj.onclose() //关闭websocket（如果上面关闭不生效就加上这一条）
    // 关闭重连
    lockReconnect = true 
    wsCreateHandler && clearTimeout(wsCreateHandler)
    // 关闭心跳检查
    heartCheck.stop()
  }
}

// 创建ws函数
const createWebSoket = () => {
  if (typeof (WebSocket) === 'undefined') {
    return false
  }

  try {
    wsObj = new WebSocket(wsUrl)
    initWsEventHandle()
  } catch (e) {
    reconnect()
  }
}

const initWsEventHandle = () => {
  try {
    // 连接成功
    wsObj.onopen = (event) => {
      onWsOpen(event)
      heartCheck.start()
    }

    // 监听服务器端返回的信息
    wsObj.onmessage = (event) => {
      onWsMessage(event) 
      heartCheck.start()
    }

    // 执行关闭
    wsObj.onclose = (event) => {
      onWsClose(event)
    }

    // 错误处理
    wsObj.onerror = (event) => {
      onWsError(event)
      reconnect()
    }
  } catch (err) {
    reconnect()
  }
}

const onWsOpen = (event) => {
  if (wsObj.readyState == wsObj.OPEN) {
    // wsObj.OPEN = 1,发送个后端的数据需要字符串化
    wsObj.send(JSON.stringify(sendDatas))
  }
  if (wsObj.readyState == wsObj.CLOSED) {
    // wsObj.CLOSED = 3
    reconnect()
    errorCallback()
  }
}

const onWsMessage = (event) => {
  const jsonStr = event.data 
  messageCallback(jsonStr)
}

const onWsClose = (event) => {
  // e.code == 1000 正常关闭；其他为非正常关闭
  if (event && event.code !== 1000) {
    errorCallback()
    reconnect()
  }
}

const onWsError = (event) => {
  errorCallback()
}

// 重连函数
const reconnect = () => {
  if (lockReconnect) return 
  writeToScreen('3s后重连')
  wsCreateHandler && clearTimeout(wsCreateHandler)
  wsCreateHandler = setTimeout(() => {
    writeToScreen('重连...' + wsUrl)
    createWebSoket()
    writeToScreen('重连完成')
  }, 3000);
}

const writeToScreen = message => {
  console.log(message);
}

// 心跳检查（看看websocket是否还在正常连接中）
let heartCheck = {
  timeout: 540000,
  timeoutObj: null,
  serverTimeoutObj: null,
  // 重启
  reset () {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    this.start()
  },

  // 停止
  stop () {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
  },

  // 开启定时器
  start () {
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    this.timeoutObj = setTimeout(() => {
      writeToScreen("心跳检查，发送ping到后台");
      try {
        const datas = { ping: true };
        wsObj.send(JSON.stringify(datas));
      } catch (err) {
        // writeToScreen("发送ping异常");
      }
      console.log("内嵌定时器this.serverTimeoutObj: ", this.serverTimeoutObj)
      // 内嵌定时器
      this.serverTimeoutObj = setTimeout(() => {
        writeToScreen('没有收到后台的数据，重新连接')
        reconnect()
      }, this.timeout);
    }, this.timeout);
  }
}