import React, {Component} from 'react';
import { Menu, Icon, Button } from 'antd';
//设置组件
import {NavLink,withRouter} from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

class LeftNav extends Component {

  componentWillMount(){
    // console.log(menuList);
    this.menu = this.menuListFunc(menuList)

  }
  menuListFunc = (menu) => {
    return menu.map((item)=>{
      if(item.children){
        const {pathname} = this.props.location;
        //找是否有与children中匹配的pathname
        const result = item.children.find(item => item.key === pathname);
        if (result) {
          //children中有与pathname匹配路径，记录item.key
          this.openKey = item.key;
        }
        return <SubMenu key={item.key} title={<span><Icon type={item.icon} />{item.title}</span>}>
          {this.menuListFunc(item.children)}
        </SubMenu>
      }else{
        return <Item key={item.key}>
          <NavLink to={item.key}>
            <Icon type={item.icon}/>
            <span>{item.title}</span>
          </NavLink>
        </Item>
      }
    })
  }
  render () {
    const {pathname} = this.props.location
    return (
       <div className="leftnav">
         <header className="header-logo">
           <img src={logo} alt="logo"/>
           <h2>硅谷后台</h2>
         </header>
         <Menu
            mode="inline"
            theme="dark"
            defaultOpenKeys={[this.openKey]}
            defaultSelectedKeys={[pathname]}
         >
           {
             this.menu
           }

         </Menu>
       </div>
    )
  }
}
export default withRouter(LeftNav);