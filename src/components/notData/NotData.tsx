import React from "react"
import {Typography} from 'antd';
import "./notData.css"

export const NotData: React.FC = () => {
  const {Text} = Typography
  return <div className="not-data"><Text  type='secondary'>Ничего не найдено</Text></div>
}