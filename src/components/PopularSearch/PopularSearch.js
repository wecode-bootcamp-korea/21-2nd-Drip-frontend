import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const PopularSearch = ({ activated, popularTermsArr }) => {
  const history = useHistory();

  return (
    <PopularSearchWrap className={!activated && 'activeOff'}>
      <Title>인기 드립</Title>
      <PopularSearchTermsList>
        {popularTermsArr.map(list => {
          return (
            <PopularSearchTerm
              key={list.product_id}
              onClick={() => history.push(`/detail/${list.product_id}`)}
            >
              {list.name.substring(0, 6) + '...'}
            </PopularSearchTerm>
          );
        })}
      </PopularSearchTermsList>
    </PopularSearchWrap>
  );
};

const PopularSearchWrap = styled.section`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  z-index: 10;

  &.activeOff {
    display: none;
  }
`;

const Title = styled.div`
  margin: 35px 0 35px 10px;
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
