import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // 引入bootstrap增强UI功能
import Todolist from './Todolist';
import './index.css';

ReactDOM.render(
  <Todolist />,
  document.getElementById('root')
);
