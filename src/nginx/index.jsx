import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button, Image, List } from 'antd';
import * as action from './store/action'
import 'antd/dist/antd.css';
import './index.css'

const ref = React.createRef

class Nginx extends Component {
    page_scroll() {
        var i = 1
        var element = document.documentElement
        element.scrollTop = 0;  // 不管他在哪里，都让他先回到最上面
     
        let interval = setInterval(main, 300)
        // 设置定时器，时间即为滚动速度
        function main() {
            if (element.scrollTop + element.clientHeight == element.scrollHeight) {
                clearInterval(interval)
                console.log('已经到底部了')
            } else {
                element.scrollTop += 300;
                console.log(i);
                i += 1;
            }
        }
    }
      
    // handleResize = e => {
    //     console.log(e.target.innerWidth)
    // }
    componentDidMount() {
        this.props.getAllPhoto()
        //监听窗口大小改变
        // window.addEventListener('resize', this.handleResize.bind(this));
    }
    //移除监听器，防止多个组件之间导致this的指向紊乱
    componentWillUnmount() {
        // window.removeEventListener('resize', this.handleResize.bind(this));
    }


    render() {
        this.page_scroll()
        console.log("data:::", this.props.data);
        const array = this.props.data
        return <div id='img'>
            {array.map((item) => {
                console.log("items:::", item);
                return <img
                    style={{ width: "16vw", height: "24vh", objectFit: "cover", margin: "5px" }}
                    src={"http://180.76.112.178:8888/" + item}
                />

            })}
        </div>

    }



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


export default connect(mapStateToPorps, mapDispatchToProps)(Nginx);

