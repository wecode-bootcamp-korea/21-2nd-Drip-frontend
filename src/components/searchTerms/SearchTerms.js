import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { commonLayOut } from '../../styles/mixin';

const Search = () => {
  const [searchTermsArr, setsearchTermsArr] = useState([]);

  useEffect(() => {
    fetch('/data/SearchTermsData.json')
      .then(res => res.json())
      .then(res => setsearchTermsArr(res.result));
  }, []);

  return (
    <SearcTermshWrap>
      <Title>인기 검색어</Title>
      <PopularSearchTermsList>
        {searchTermsArr.map((list, index) => {
          return <PopularSearchTerm key={index}>{list}</PopularSearchTerm>;
        })}
      </PopularSearchTermsList>
    </SearcTermshWrap>
  );
};

const SearcTermshWrap = styled.section`
  ${commonLayOut}
  display: none;
  position: absolute;
  height: 100%;
  margin-bottom: 30px;
  padding: 0 10px;
  background-color: #ffffff;
  z-index: 100;
`;

const Title = styled.div`
  margin: 25px 0;
  font-size: 14px;
  font-weight: bold;
`;

const PopularSearchTermsList = styled.div`
  display: flex;
`;

const PopularSearchTerm = styled.div`
  margin-right: 15px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.SignitureColor};
  color: ${props => props.theme.SignitureColor};
  font-size: 13px;
  cursor: pointer;
`;

export default Search;
