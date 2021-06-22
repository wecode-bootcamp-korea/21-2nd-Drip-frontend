import React, { useState, useEffect } from 'react';
import MainCard from '../../components/MainCard/MainCard';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import styled from 'styled-components';
import { flexSet, twoRowCardSet, commonLayOut } from '../../styles/mixin';

const ACTIVITY_CATEGORY = [
  '전체',
  '서핑',
  '캠핑',
  '등산・트래킹',
  '러닝・라이딩',
  '도보여행',
  '기타',
  '수상레포츠',
];

const Activity = () => {
  const [activityDripArr, setActivityDripArr] = useState([]);
  const [isActivatedCategory, setIsActivatedCategory] = useState('전체');

  useEffect(() => {
    fetch('/data/DripListData.json')
      .then(res => res.json())
      .then(res => setActivityDripArr(res.RESULT.best));
  }, []);

  const handleCategory = list => {
    console.log(list);
  };

  return (
    <ActivityWrap>
      <HeaderNav />
      <CategoryList>
        {ACTIVITY_CATEGORY.map((list, index) => {
          return (
            <Category
              className={isActivatedCategory === list ? 'activeOn' : ''}
              key={list}
              value={index}
              onClick={() => {
                handleCategory(index);
              }}
            >
              {list}
            </Category>
          );
        })}
      </CategoryList>
      <List>
        <TitleWrap>
          <Title>인기 액티비티 {activityDripArr.length}</Title>{' '}
          <select>
            <option value="">필터</option>
            <option value="popular">인기순</option>
            <option value="new">최신순</option>
            <option value="highPrice">가격 높은순</option>
            <option value="lowPrice">가격 낮은순</option>
          </select>
        </TitleWrap>
        <DripsWrap>
          {activityDripArr.map(list => {
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
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 0 10px;
`;

const Category = styled.li`
  font-size: 12px;
  cursor: pointer;

  &.activeOn {
    color: ${props => props.theme.SignitureColor};
    font-weight: bold;
  }
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

export default Activity;
