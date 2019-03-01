import React, {Component} from 'react';
import {Col,Row,message} from 'antd'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd';
import dayjs from 'dayjs'


import menuList from '../../config/menuConfig'
import MemoryUtils from '../../utils/memoryUtils';
import {removeItem} from '../../utils/storeUtils';
import {reqWeather} from '../../api'
import './index.less'


class Header extends Component {

  state={
    dayTime:dayjs().format('YYYY MM-DD HH:mm:ss'),
    dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/qing.png',
    weather: '晴11'

  }
  showConfirm = () =>{
    const confirm = Modal.confirm;
    confirm({
      title: '您确定退出吗?',
      okText:'确定',
      cancelText:'取消',
      onOk:()=> {

        MemoryUtils.user = {}
        removeItem()
        this.props.history.replace('/login')
        console.log('OK');
      }
    });
  }
  componentWillUnmount () {
    //清除定时器
    clearInterval(this.intervalId);
  }
  componentDidMount(){
    this.intervalId = setInterval(()=>{
      this.setState({
        dayTime:dayjs().format('YYYY MM-DD HH:mm:ss')
      })
    },1000)
    this.getWeather()
  }
  getWeather = () => {
    reqWeather('北京')
       .then(res => {
         this.setState({
           dayPictureUrl: res.dayPictureUrl,
           weather: res.weather
         })
       })
       .catch(err => {
         message.error(err);
       })
  }

  nameFunction = (menu) =>{
    const {pathname} = this.props.location
    // console.log(pathname);
    for (let i = 0; i < menu.length; i++) {
      const obj = menu[i]
      if(obj.children){
        /*for (var j = 0; j < obj.children.length; j++) {
          var obj1 = obj.children[j];
          if(obj1.children){

          }else{
            if(obj.key === pathname){
              return obj.title
            }
          }
        }*/
        const title =  this.nameFunction(obj.children)
        if(title){
          return title
        }
      }else{
        if(obj.key === pathname){
          return obj.title
        }
      }

    }

  }

  render () {
    const {username} = MemoryUtils.user
    const item = this.nameFunction(menuList) ? this.nameFunction(menuList) : '首页'


    return (
       <div className="header-right">
         <Row className='hesder-top'>
           <span>欢迎，{username}</span>
           <a href="javascript:void (0);" onClick={this.showConfirm}>退出</a>
         </Row>
         <Row className='header-bottom'>
           <Col span={6} className='header-bottom-left'>{item}</Col>
           <Col span={18} className='header-bottom-right'>
             <span>{this.state.dayTime}</span>
             <img src={this.state.dayPictureUrl} alt="天气"/>
             <span>{this.state.weather}</span>
           </Col>
         </Row>
       </div>
    )
  }
}
export default withRouter(Header)