import React, {Component} from 'react';
import logo from '../../assets/images/logo.png'
import './index.less'
import LoginForm from '../../components/login-form'
import {reqLogin} from '../../api'
import {setItem} from '../../utils/storeUtils'

export default class Login extends Component {
  /*login = async(username,password) =>{
    const reslue = await reqLogin(username,password)
    // console.log(reslue.status);
    if(reslue.status ===0){
      console.log('ok');
    }
  }*/
  state={
    errMsg :''
  }
  login = async (username, password) => {
    //请求登陆
    const result = await reqLogin(username, password);
    console.log(result);
    if (result.status === 0) {
      //用户登陆成功
      //保存用户信息
      setItem(result.data)
      //跳转到admin页面
      this.props.history.replace('/');
    } else {
      //用户登陆失败
      //提示错误信息
      this.setState({
        errMsg: result.msg
      })
    }
  }

  render () {
    // console.log(this.state);
    const {errMsg} = this.state
    const height = errMsg ? 30 : 0
    return (
       <div className="logo-div">
         <header className="logo-herder">
           <img src={logo} alt="logo"/>
           <h1>React项目: 后台管理系统</h1>
         </header>
         <section className="logo-user">
           <div className='err-msg' style={{height}}>{errMsg}</div>
           <h2>用户登陆</h2>
           <LoginForm login={this.login}/>
         </section>
       </div>
    )
  }
}