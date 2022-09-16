import { useEffect } from "react";
import { connect } from 'react-redux';
import * as action from '../nginx/store/action'
// import cookie from 'react-cookies'

var Socket //客户端
var reconnect = false //判断是否重新连接
var WS_IP //连接ip
var token = ""+Date.parse(new Date())
 const   WebSocketFc = (props) =>{
    useEffect(() =>{
        WS_IP = "ws://180.76.112.178:8080/wsresult?" + token;
    Ws_Connect();
    },[])

   const Ws_Connect = () =>{
    
        Socket = new WebSocket(WS_IP);
        initWs();
    }

   const initWs = () =>{
         //连接时
        Socket.onopen = function(){
            //发送心跳
            heartCheck.reset().start()
        }
        //接收到消息时
        Socket.onmessage = function(info){
            //判断是心跳还是数据
           const data = JSON.parse(info.data)
           console.log(data)
            switch(data.type){
                case 'heart' :
                    heartCheck.reset().start();
                    console.log("websocket接收心跳数据", data);
                    break;
                case 'potos':
                    props.getAllPhoto()
                default: 
                    console.log("websocket接收看板数据>>>",data)
            }
        }

        //连接异常时触发
        Socket.onerror = function(event){
            console.log("连接异常》〉》〉",event) 
            Socket.close()//将socket关闭交给onclose方法处理
           
        }
        //关闭连接时
        Socket.onclose = function(){
            // console.log("连接关闭重新连接")
            heartCheck.reset(); //并清除定时器
            //重新连接
            reconnect = true;
            websocketReconnec();
        }

        //定时发心跳
        var heartCheck = {
            timeout: 6000,
            timeoutObj: null,
            serverTimeoutObj: null,
            reset: function(){
                if(this.timeoutObj){
                    //清理定时器
                    clearTimeout(this.timeoutObj)
                    clearTimeout(this.serverTimeoutObj)
                }
                return this;
            },
            start: function(){
                //启动心跳定时器
                 //  心跳数据发送
                 const data = {
                    type: "heart", data: { "message": "心跳" },
                    from: 'liu'
              };
                this.timeoutObj = setTimeout(() => {
                    try{
                        console.log("发送心跳")
                         Socket.send(JSON.stringify(data));
                    }catch (e) {
                        console.log("发送心跳异常")
                        Socket = null;
                        websocketReconnec();
                    }
                }, this.timeout);
            }
        }

    }
   
    const websocketReconnec = () =>{
        if(!reconnect) return;
        //如果定时器部位空清理定时器
        tt&&clearTimeout(tt)
        if(reconnect){
            var tt = setTimeout(() => {
            console.error("断线重连中，请稍后。。。。。。");
            Ws_Connect();
            reconnect = false;
            }, 3000);
        }
    }
    //返回空组件
    return null;
}


const mapStateToPorps = state => {
    // console.log(state.excelDemo.data.excelExampleTemplates)
    // debugger
    console.log(state)
    // excel模版路径
    return ({ data: state.nginx.data })
};


const mapDispatchToProps = dispatch => ({
    // 获取表单模版路径
    getAllPhoto() {
        dispatch(action.getAllPhoto());
    }
});
export default connect(mapStateToPorps, mapDispatchToProps)(WebSocketFc)
