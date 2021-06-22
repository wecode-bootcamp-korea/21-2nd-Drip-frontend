import React, { useState, useEffect } from 'react';
import MainCard from '../../components/MainCard/MainCard';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import styled from 'styled-components';
import { commonLayOut, flexSet, twoRowCardSet } from '../../styles/mixin';

const LEARNING_CATEGORY = [
  '전체',
  '목공예',
  '쿠킹',
  '자수',
  '가죽공예',
  '춤',
  '뷰티',
  '베이킹',
  'DIY',
];

const Learning = () => {
  const [dripArr, setDripArr] = useState([]);

  useEffect(() => {
    fetch('/data/DripListData.json')
      .then(res => res.json())
      .then(res => setDripArr(res.RESULT.best));
  }, []);

  return (
    <ActivityWrap>
      <HeaderNav />
      <CategoryList>
        {LEARNING_CATEGORY.map((list, index) => {
          return (
            <Category key={index} value={index}>
              {list}
            </Category>
          );
        })}
      </CategoryList>
      <List>
        <TitleWrap>
          <Title>인기 배움 {dripArr.length}</Title>{' '}
          <select>
            <option value="">필터</option>
            <option value="popular">인기순</option>
            <option value="new">최신순</option>
            <option value="highPrice">가격 높은순</option>
            <option value="lowPrice">가격 낮은순</option>
          </select>
        </TitleWrap>
        <DripsWrap>
          {dripArr.map(list => {
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
        </DripsWrap>
      </List>
    </ActivityWrap>
  );
};

const ActivityWrap = styled.section`
  ${commonLayOut}
`;

const CategoryList = styled.ul`
  ${flexSet('row', 'space-between', 'flex-start')}
  margin: 20px 0;
  padding: 0 10px;
`;

const Category = styled.li`
  font-size: 12px;
`;

const List = styled.div`
  margin-top: 20px;
  padding: 0 10px;
`;

const TitleWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
  margin: 30px 0;
  font-size: 16px;
`;

const DripsWrap = styled.div`
  ${twoRowCardSet}
`;

const Title = styled.span`
  font-weight: bold;
`;

export default Learning;
