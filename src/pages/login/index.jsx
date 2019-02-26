import React, {Component} from 'react';
import logo from './logo.png'
import './index.less'
import LoginForm from '../../components/login-form'

export default class Login extends Component {
  render () {
    return (
       <div className="logo-div">
         <header className="logo-herder">
           <img src={logo} alt="logo"/>
           <h1>React项目: 后台管理系统</h1>
         </header>
         <section className="logo-user">
           <h2>用户登陆</h2>
           <LoginForm/>
         </section>
       </div>
    )
  }
}