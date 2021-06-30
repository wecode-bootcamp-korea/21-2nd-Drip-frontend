import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const HeaderSearch = () => {
  const history = useHistory();
  return (
    <HeaderSearchWrap>
      <SearchBackground
        onClick={() => {
          history.push('/search');
        }}
      >
        <SearchIcon alt="Search" src="/images/Search/search.png" />
        검색어를 입력해 주세요.
      </SearchBackground>
    </HeaderSearchWrap>
  );
};

const HeaderSearchWrap = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const SearchBackground = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
  padding: 10px 15px;
  margin: 0 10px;
  border-radius: 35px;
  color: ${props => props.theme.Gray};
  background-color: ${props => props.theme.LightGray};
  cursor: text;
`;

const SearchIcon = styled.img`
  width: 14px;
  margin-right: 10px;
  opacity: 0.5;
`;

export default HeaderSearch;
