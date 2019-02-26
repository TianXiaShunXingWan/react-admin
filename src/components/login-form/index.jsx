import React, {Component} from 'react';
import {
  Form, Icon, Input, Button, message
} from 'antd';

 class LoginForm extends Component {


   customEvent = (rule, value, callback) => {
     if (!value) {
       callback('必须输入密码');
     } else if (value.length < 4) {
       callback('密码长度必须超过4位');
     } else if (value.length > 11) {
       callback('密码长度必须小于11位');
     } else if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
       //代表校验不通过
       callback('密码只能包含大小写英文、数字或者下划线')
     } else {
       //代表校验通过
       callback();
     }
   }

   handleSubmit = e => {
     e.preventDefault();
     const {validateFields, resetFields} = this.props.form;
     console.log(validateFields());
     validateFields((error, values) => {
       // console.log(error, values);
       console.log(Object());
       if (!error) {
         console.log('收集的表单数据：', values);
       } else {
         resetFields(['password']);
         const errMsg = Object.values(error).reduce((prev, curr) => prev + curr.errors[0].message + ' ', '')

         message.error(errMsg);
       }

     })
   }

  render () {
    const Item = Form.Item
    const { getFieldDecorator } = this.props.form;

    return (

    <Form onSubmit={this.handleSubmit} className="logo-Form">
      <Item>
        {getFieldDecorator(
           'username',{
          rules: [
             { required: true, message: '请输入用户名!' },
            {min: 5 , message: '至少要输入5位'},
            {max: 12 , message: '最多输入12位'},
            {pattern:/^[a-zA-Z0-9]+$/, message:'必须是大小写英文、数字或者下划线'}

          ]}
        )(
           <Input prefix={<Icon type="user"/>} placeholder="Username" />
        )}
      </Item>
      <Item>
        {getFieldDecorator(
           'password',{
             rules:[
               {validator : this.customEvent}
             ]
           }
        )(
           <Input type='password' prefix={<Icon type="safety" />} placeholder="password" />
        )}

      </Item>
      <Item>
        <Button type="primary" htmlType='submit' block>登录</Button>
      </Item>
    </Form>

    )
  }
}

export default Form.create()(LoginForm)