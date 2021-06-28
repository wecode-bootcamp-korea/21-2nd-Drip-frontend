import React from 'react';
import styled from 'styled-components';

const PopularSearch = ({ activated, popularSearchTerms, SearchPopular }) => {
  return (
    <PopularSearchWrap className={!activated && 'activeOff'}>
      <Title>인기 검색어</Title>
      <PopularSearchTermsList>
        {popularSearchTerms.map(list => {
          return (
            <PopularSearchTerm
              key={list.id}
              value="1"
              onClick={() => SearchPopular(list.name)}
            >
              {list.name}
            </PopularSearchTerm>
          );
        })}
      </PopularSearchTermsList>
    </PopularSearchWrap>
  );
};

const PopularSearchWrap = styled.section`
  position: absolute;
  height: 100vh;
  padding: 10px;
  background-color: #ffffff;
  z-index: 10;

  &.activeOff {
    display: none;
  }
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

export default PopularSearch;
