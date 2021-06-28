import React, { useState, useEffect } from 'react';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import MainCard from '../../components/MainCard/MainCard';
import styled from 'styled-components';
import { twoRowCardSet, commonLayOut } from '../../styles/mixin';

const Main = () => {
  const [hotDripArr, setHotDripArr] = useState([]);
  const [newDripArr, setNewDripArr] = useState([]);

  useEffect(() => {
    fetch('/Data/DripListData.json')
      .then(res => res.json())
      .then(res => {
        setHotDripArr(res.RESULT.best);
        setNewDripArr(res.RESULT.new);
      });
  }, []);

  return (
    <MainWrap>
      <HeaderSearch />
      <HeaderNav />
      <BigBanner>
        <BannerImage alt="banner" src="/images/main/bigbanner-1.png" />
        <LeftButton>&lt;</LeftButton>
        <RightButton>&gt;</RightButton>
      </BigBanner>
      <List>
        <Title>지금 뜨는 드립 🚀</Title>
        <DripWrap>
          {hotDripArr.map(list => {
            return (
              <MainCard
                key={list.product_id}
                id={list.product_id}
                title={list.product_name}
                listPrice={parseInt(list.product_price).toLocaleString()}
                price={
                  list.discount === '1'
                    ? parseInt(list.product_price).toLocaleString()
                    : parseInt(
                        list.product_price * (1 - list.discount)
                      ).toLocaleString()
                }
                region={list.adress}
                isNew={list.new_tag}
                isHot={list.hot_tag}
                grade={list.avg_score}
                thumbnail={list.product_image}
              />
            );
          })}
        </DripWrap>
      </List>
      <List>
        <Title>신규 드립 🧡</Title>
        <DripWrap>
          {newDripArr.map(list => {
            return (
              <MainCard
                key={list.product_id}
                id={list.product_id}
                title={list.product_name}
                listPrice={parseInt(list.product_price).toLocaleString()}
                price={
                  list.discount === '1'
                    ? parseInt(list.product_price).toLocaleString()
                    : parseInt(
                        list.product_price * (1 - list.discount)
                      ).toLocaleString()
                }
                region={list.adress}
                isNew={list.new_tag}
                isHot={list.hot_tag}
                grade={list.avg_score}
                thumbnail={list.product_image}
              />
            );
          })}
        </DripWrap>
      </List>
    </MainWrap>
  );
};

const MainWrap = styled.section`
  ${commonLayOut}
`;

const BigBanner = styled.article`
  position: relative;
  width: 485px;
  margin-bottom: 60px;
`;

const BannerImage = styled.img`
  width: 100%px;
`;

const LeftButton = styled.div`
  position: absolute;
  top: 45%;
  left: 15px;
  padding: 5px;
  background-color: ${props => props.theme.LightGray};
  opacity: 0.5;
  cursor: pointer;
`;

const RightButton = styled.div`
  position: absolute;
  top: 45%;
  right: 15px;
  padding: 5px;
  background-color: ${props => props.theme.LightGray};
  opacity: 0.5;
  cursor: pointer;
`;

const List = styled.div`
  margin-top: 20px;
  padding: 0 10px;
`;

const DripWrap = styled.div`
  ${twoRowCardSet}
`;

const Title = styled.div`
  margin: 30px 0;
  font-size: 20px;
  font-weight: bold;
`;

export default Main;
