import React, { useState, useEffect } from 'react';
import MainCard from '../MainCard/MainCard';
import styled from 'styled-components';
import { flexSet, twoRowCardSet, commonLayOut } from '../../styles/mixin';

const Search = () => {
  const [dripArr, setDripArr] = useState([]);

  useEffect(() => {
    fetch('/data/DripListData.json')
      .then(res => res.json())
      .then(res => setDripArr(res.result));
  }, []);

  return (
    <SearchWrap>
      <TitleWrap>
        <Title>제주 검색 결과 {dripArr.length}</Title>
        <select>
          <option value="">필터</option>
          <option value="popular">인기순</option>
          <option value="new">최신순</option>
          <option value="highPrice">가격 높은순</option>
          <option value="lowPrice">가격 낮은순</option>
        </select>
      </TitleWrap>
      <DripWrap>
        {dripArr.map((list, index) => {
          return (
            <MainCard
              key={index}
              id={index}
              title={list.title}
              listPrice={list.listPrice}
              price={list.price}
              region={list.region}
              isNew={list.isNew}
              isHot={list.isHot}
              grade={list.grade}
              thumbnail={list.thumbnail}
            />
          );
        })}
      </DripWrap>
    </SearchWrap>
  );
};

const SearchWrap = styled.section`
  ${commonLayOut}
  padding: 0 10px;
`;

const TitleWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
`;

const Title = styled.div`
  margin: 30px 0;
  font-size: 20px;
  font-weight: bold;
`;

const DripWrap = styled.div`
  ${twoRowCardSet}
`;

export default Search;
