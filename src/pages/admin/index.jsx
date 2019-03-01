import React, {Component} from 'react';
import { Layout } from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom'

import Footer from '../../components/footer'
import Header from '../../components/header'
import LeftNav from '../../components/left-nav'
import Home from '../home'
import Category from '../category'
import User from '../user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Role from '../role'
import Product from '../product'
import './index.less'

import MemoryUtils from '../../utils/memoryUtils';

const {
   Content, Sider,
} = Layout;

export default class Admin extends Component {
  render () {
    const user = MemoryUtils.user;
    // console.log(user);
    if(!user && !user._id){
      return <Redirect to='/login'/>
    }
    /*if(!store.get('uer')){
      return <Redirect to='/login'/>
    }*/
    return (

         <Layout style={{minHeight:'100vh'}}>
           <Sider>
             <LeftNav/>
           </Sider>
           <Layout>
             <Header/>
             <Content>
               <Switch>
                 <Route path='/home' component={Home}/>
                 <Route path='/category' component={Category}/>
                 <Route path='/user' component={User}/>
                 <Route path="/role" component={Role}/>
                 <Route path='/charts/bar' component={Bar}/>
                 <Route path='/charts/line' component={Line}/>
                 <Route path='/charts/pie' component={Pie}/>
                 <Route path='/product' component={Product}/>
               </Switch>
             </Content>
             <Footer/>
           </Layout>
         </Layout>
    )
  }
}