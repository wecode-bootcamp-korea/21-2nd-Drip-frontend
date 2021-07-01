import React, { useState, useEffect } from 'react';
import MainCard from '../../components/MainCard/MainCard';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import BottomNav from '../../components/BottomNav/BottomNav';
import Footer from '../../components/Footer/Footer';
import styled from 'styled-components';
import LEARNING_CATEGORY from './LearningCategoryData';
import CATEGORY_FILTER from './FilterData';
import { flexSet, twoRowCardSet, commonLayOut } from '../../styles/mixin';
import { API } from '../../config';

const Learning = () => {
  const [learningDripArr, setLearningDripArr] = useState([]);
  const [isActivatedCategory, setIsActivatedCategory] = useState('전체');
  const [queryString, setQueryString] = useState('categoryId=2');

  useEffect(() => {
    fetch(`${API}/products?${queryString}`)
      .then(res => res.json())
      .then(res => setLearningDripArr(res.result));
  }, [queryString]);

  const handleCategory = (category, queryString) => {
    setIsActivatedCategory(category);
    setQueryString(queryString);
  };

  const handleFilter = event => {
    const { value } = event.target;

    const filtered = CATEGORY_FILTER.filter(list => list.value === value)[0]
      .queryString;

    fetchFilter(queryString + filtered);
  };

  const fetchFilter = string => {
    fetch(`${API}/products?${string}`)
      .then(res => res.json())
      .then(res => setLearningDripArr(res.result));
  };

  return (
    <LearningWrap>
      <HeaderSearch />
      <HeaderNav />
      <CategoryList>
        {LEARNING_CATEGORY.map(list => {
          return (
            <Category
              className={
                isActivatedCategory === list.category ? 'activeOn' : ''
              }
              key={list.category}
              value={list.id}
              onClick={() => {
                handleCategory(list.category, list.queryString);
              }}
            >
              {list.category}
            </Category>
          );
        })}
      </CategoryList>
      <List>
        <TitleWrap>
          <Title>
            인기{' '}
            {isActivatedCategory === '전체' ? '액티비티' : isActivatedCategory}{' '}
            {learningDripArr.length}
          </Title>{' '}
          <select onChange={event => handleFilter(event)}>
            {CATEGORY_FILTER.map(filter => {
              return (
                <option key={filter.id} value={filter.value}>
                  {filter.name}
                </option>
              );
            })}
          </select>
        </TitleWrap>
        <DripsWrap>
          {learningDripArr.map(list => {
            return (
              <MainCard
                key={list.product_id}
                id={list.product_id}
                title={list.product_name}
                listPrice={parseInt(list.product_price).toLocaleString()}
                price={parseInt(
                  list.discount !== '1' && list.discount
                ).toLocaleString()}
                region={list.adress}
                isNew={list.new_tag}
                isHot={list.hot_tag}
                grade={list.avg_score}
                thumbnail={list.product_image}
                bookMarked={list.check}
              />
            );
          })}
        </DripsWrap>
      </List>
      <Footer />
      <BottomNav />
    </LearningWrap>
  );
};

const LearningWrap = styled.section`
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

export default Learning;
