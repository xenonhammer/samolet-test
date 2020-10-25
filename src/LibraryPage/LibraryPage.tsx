import { Button, Col, Descriptions, Row } from "antd";
import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom";
import { TLibrary } from "../api";
import { Header } from "../components/header/header";
import { NotData } from "../components/notData/NotData";
import { useAppContext } from "../context/context";
import './libraryPage.css'

export const LibraryPage: React.FC<{kopuk: string}> = ({kopuk}) => {
  const history = useHistory();
  const {dataAllLibs} = useAppContext();
  const [infoLib, setInfoLib] = useState<TLibrary|undefined>();

  useEffect(()=> {
    const info = dataAllLibs.find(e => e.kopuk === kopuk)
    console.log('kopuk :>> ', kopuk);
    if(info) {
      setInfoLib(info);
    }
  }, [infoLib])

  useEffect(()=>{
    if(kopuk && kopuk === '') history.push("/")
  }, [kopuk])
  
  const getInfo = (data?: TLibrary) => {
    if(data){
      
      return <>
        <Descriptions 
          className="description" 
          title="Подробная информация" 
          bordered column={1}
          size="small"
          layout='vertical'
        >
        
          {Object.entries(data).map((e) =>(
            <Descriptions.Item key={e[0]} label={e[0]}>{e[1]}</Descriptions.Item>
          ))}
        </Descriptions>
        </>
    }else null
  }

  
  return <>
    <Header>Библиотека 
      <Link to="/">
        <Button>Назад</Button>
      </Link>
    </Header>


   <Row>
   <Col lg={6} md={4} sm={2} xs={0}></Col>
   <Col lg={12} md={16} sm={20} xs={24}>
     { getInfo(infoLib)  ?? <NotData />}
    </Col>
    <Col lg={6} md={4} sm={2} xs={0}></Col>
   </Row>


  </>
}