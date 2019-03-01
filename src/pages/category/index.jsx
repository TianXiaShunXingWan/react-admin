import React, {Component} from 'react';
import { Card ,Button ,Icon,Table ,message} from 'antd';
import {reqCategory} from '../../api'

export default class Category extends Component {

  state={
    category : []
  }

  categoryData = async parentId =>{
    const retule = await reqCategory(parentId)
    console.log(retule);
    if(retule.status === 0){
        this.setState({
          category:retule.data
        })
    }else{
      message.error('用户列表失败')
    }
  }

  componentDidMount(){
    this.categoryData('0')
  }

  render () {
    const columns = [{
      title: '品类名称',
      dataIndex: 'name',
    }, {
      title: '操作',
      className: 'column-money',
      dataIndex: 'money',
      render: text => {
        return <div>
          <a href="javascript:void (0);">修改名称</a>&nbsp;&nbsp;&nbsp;
          <a href="javascript:void (0);">查看其子品类</a>
      </div>}
    }];


    return (
       <Card
          title="一级分类列表"
          extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}
       >
         <Table
            columns={columns}
            dataSource={this.state.category}
            bordered
            pagination={{
              pageSize:3,
              showSizeChanger: true,
              pageSizeOptions:['3','6','9','12'],
              showQuickJumper:true
            }}
            rowKey = {'_id'}
         />
       </Card>
    )
  }
}