import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Input, Layout, List, message, Row, Typography } from 'antd';
import '../homePage/homePage.css';
import { Header } from '../components/header/header';
import { getData, TLibrary } from '../api';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/context';
import { NotData } from '../components/notData/NotData';
const { Option } = Select;

const { Text } = Typography;
const { Content } = Layout;

export default function HomePage() {
  const [data, setData] = useState<Array<TLibrary> | undefined>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortValue, setSortValue] = useState<TSortValue>("up");
  const {setDataAllLibs} = useAppContext();

  type TSortValue = "down" | "up";

  useEffect(() => {
    getData()
    .then(res => {
      message.success('Данные загружены',2)
      setData(res);
      setDataAllLibs(res);
    })
    .catch(e=> message.error(e.message, 2));
  }, []);

  useEffect(()=> {
    if(data){
      if(sortValue === "up")  setData(getSort("up" ,searchResult))
      else setData(getSort('down', searchResult))
    }

  },[sortValue])


  const searchResult = useMemo(() => {
    if (data) {
      return data.filter(e => {
        if (searchValue === '') return e
        return new RegExp(searchValue, 'i').test(e.territory!)
      })
    } else {
      return []
    }
  }, [searchValue, data])


  const getSort = (sort: TSortValue,library: TLibrary[]): TLibrary[] => {

    return library.sort((a, b)=> {
      if(sort === "up")
        return (
          library.filter(e => e.territory === a.territory).length -
          library.filter(e => e.territory === b.territory).length
        )
      else return (
        library.filter(e => e.territory === b.territory).length -
        library.filter(e => e.territory === a.territory).length 
      )
    })
  }


  const handleSort = (value: TSortValue) => {
    setSortValue(value);
  }



  return <>
    <Layout >
      <Header>Библиотеки</Header>
      <Row
        justify="end"
      >
        <Col lg={6} md={4} sm={2} xs={0}></Col>
        <Col lg={12} md={16} sm={20} xs={24}>

          <Content className="root-content">
            <Row>

              <Col lg={18} md={18} sm={18} xs={12}>
                <Input
                  className="search-fild"
                  allowClear
                  value={searchValue}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    event.persist();
                    setSearchValue((prev) => {prev = event.target.value; return prev })
                  }}
                  placeholder="Начать поиск..."
                />
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
              <Select  
                defaultValue="up"
                className="sort"
                onChange={handleSort}
              >
                <Option  value="down">от больш.</Option>
                <Option value="up">от меньш.</Option>
              </Select>
              </Col>
            </Row>

            <Text className="count">
              {`${searchValue.length > 0 ? "Найдено:" : "Всего:"} ${searchResult.length}`}
            </Text>

              <List
                bordered
              >
                {searchResult.length > 1

                ? searchResult.map((elem) => {
                  return <React.Fragment key={elem?.fullname}>
                    <List.Item
                      actions={[<Link to={`/${elem.kopuk}`}><Button>Подробнее</Button></Link>]}
                    >
                      <List.Item.Meta
                        title={elem?.fullname}
                        description={elem?.territory}
                      >

                      </List.Item.Meta>
                    </List.Item>
                  </React.Fragment>
                })
                : <NotData />}

              </List>
          </Content>

        </Col>
        <Col lg={6} md={4} sm={2} xs={0}></Col>
      </Row>
    </Layout>
  </>
}
