
//  完成添加和编辑等操作的模态组件（子组件）

import React, { Component } from 'react';
import {
	Button, Modal, ModalHeader,
	ModalBody, ModalFooter,Form, 
	FormGroup, Input, Label
} from 'reactstrap'; //导入reactstrap模块

export default class CustomModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: this.props.activeItem    // 接收父组件（Todolist)传递过来的activeItem
		};
	}
	
	//handleChange函数: 当activeItem中的值发生改变时执行（title,descriptiong,completed)
	handleChange = e => {
		let { name, value } = e.target;
		if (e.target.type === 'checkbox') {
			value = e.target.checked;
		}
		const activeItem = {...this.state.activeItem, [name]: value};
		this.setState({activeItem})  // 更新activeItem的值
	};
	render() {
		const { toggle, onSave } = this.props;
		return (
		<Modal isOpen={true} toggle={toggle}>
		<ModalHeader toggle={toggle}> 待办事项 </ModalHeader>
		<ModalBody>
		  <Form>
		    <FormGroup>
			  <Label for='title'>任务</Label>
			  <Input 
			    type='text'
				name='title'
				value={this.state.activeItem.title}
				onChange={this.handleChange}
				placeholder='请输入名称'
				/>
			</FormGroup>
			<FormGroup>
			  <Label for='description'>任务描述</Label>
			  <Input 
			    type='text'
				name='description'
				value={this.state.activeItem.description}
				onChange={this.handleChange}
				placeholder='请输入任务描述'
				/>
			</FormGroup>
			<FormGroup>
			  <Label for='completed'>
			    <Input
			      type='checkbox'
			      name='completed'
			      checked={this.state.activeItem.completed}
			      onChange={this.handleChange}
			      />
			  是否完成
			  </Label> 
			</FormGroup>
		  </Form>
		</ModalBody>
		<ModalFooter>
		  <Button color='success' 
		  onClick={() => onSave(this.state.activeItem)}>点击保存</Button>  
		</ModalFooter>
	  </Modal>
	  );
	  //通过onSave与父组件进行通信，将更新/添加后的activeItem传递给父组件
	}
}
