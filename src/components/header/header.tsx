import React from 'react';
import {Layout} from 'antd'
import { LayoutProps } from 'antd/lib/layout';
import './header.css'

export const Header: React.FC<LayoutProps> = (props) => {
  const {Header} = Layout;
  
  return <Header {...props} className={`header ${props.className ?? ''}`}></Header>
}