
//todolist应用展示页面（父组件）

import React, { Component } from 'react';
import Modal from './Modal.js';  //导入模态组件
import axios from 'axios';  //导入axios

class Todolist extends Component {
  constructor(props) {
	super(props);
	this.state = {
		viewCompleted: false,
		activeItem: {
		  title: '',
		  description: '',
		  completed: false,
		},
		todoList: [],  //  展示内容（title的值）
	};
  }
  
  //渲染完成后执行refresList()方法
  componentDidMount() {
	  this.refreshList();
  }
  
  // 向django服务器发送get请求，成功后更新todoList数据，失败则在控制台提示错误信息
  refreshList = () => {
	  axios
	    .get('http://localhost:8000/api/todos')
		.then(res => this.setState({ todoList: res.data }))
        .catch(err => console.log(err));	
  }
  
  //  状态（是否完成）更新函数
  displayCompleted = status => {
	  if (status) {
		  return this.setState({ viewCompleted: true });  
	  }
	  return this.setState({ viewCompleted: false });
  }
  
  // 状态栏函数： 点击相应状态，传递viewCompleted的值
  renderTabList = () => {
	  return (
	    <div className='my-5 tab-list'>
		  <span
		    onClick={() => this.displayCompleted(true)}
			className={this.state.viewCompleted ? 'active' : ''}
		  >已完成</span>
		  <span 
		    onClick={() => this.displayCompleted(false)}
			className={this.state.viewCompleted ? '' : 'active'}
		  >未完成</span>
		</div>
	  );
  }
  
  // 任务的内容展示（含“编辑”和“删除”按钮）
  renderItems = () => {
	  const { viewCompleted } = this.state;
	  const newItem = this.state.todoList.filter(
	    item => item.completed === viewCompleted
		);  //获取不同状态下的item,保存入newItem
		
	 //对newItem进行遍历并展示
	  return newItem.map(item => (
	    <li
		  key={item.id}
		  className='list-group-item d-flex justify-content-between align-items-center'
		>
		  <span
		    className={`todo-title mr-2 ${
				this.state.viewCompleted ? 'completed-todo' : ''
		    }`}		
			title={item.description}
		  >
		  {item.title}  
		  </span>
		  <span>
		    <button
			  onClick={() => this.editItem(item)}  
			  className='btn btn-secondary mr-2'
			>
			{''}
			编辑{''}
			</button>
			<button
			  onClick={() => this.handleDelete(item)}  
			  className='btn btn-danger'
			>删除{''}</button>
		  </span>
		</li>
	  ));
  }
  
  //模态框的弹出与否，开始时为不弹出
  toggle = () => {
	this.setState({ modal: !this.state.modal });
  }
  
  //提交函数:完成更改或添加，点击保存时触发
  handleSumbit = item => {
	this.toggle();
	//根据item.id向django服务器发送put/post和get请求
	if(item.id) {
	  axios
		.put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => this.refreshList());
	  return;
	  }
	
	axios
	  .post('http://localhost:8000/api/todos/', item)
      .then(res => this.refreshList());
  }
  
  // 删除函数：删除数据库中相应的数据
  handleDelete = item => {
	  axios
	    .delete(`http://localhost:8000/api/todos/${item.id}`)
		.then(res => this.refreshList());
  }
  
  //  添加函数：添加新的项目时调用，弹出模态框，添加activeItem的数据
  createItem = () => {
	  const item = { title: '', description: '', completed: false };
	  this.setState({ activeItem: item, modal: !this.state.modal });
  }
  
  //  编辑函数：更改项目时调用，弹出模态框，进行activeItem的更新
  editItem = item => {
	  this.setState({ activeItem: item, modal: !this.state.modal });
  }
  
  render() {
    return (
	  <main className='content'>
	    <h1 className='text-white text-uppercase text-center my-4'>备忘录</h1>
        <div className='row'>
		  <div className='col-md-6 col-sm-10 mx-auto p-0'>
		    <div className='card p-3'>
			  <div className=''>
			    <button 
				onClick={this.createItem}
				className='btn btn-primary'>添加任务</button> 
			  </div>
			  {this.renderTabList()} 
			  <ul className='list-group list-group-flush'>
			    {this.renderItems()}  
			  </ul>
			</div>
	      </div>
		</div>
		{this.state.modal ? (
		  <Modal
		    activeItem={this.state.activeItem}
			toggle={this.toggle}
			onSave={this.handleSumbit}
		  />
		  ) : null}
	  </main>
	);
  }
}

export default Todolist;
