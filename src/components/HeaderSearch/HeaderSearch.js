import React from 'react';
import SearchTerms from '../searchTerms/SearchTerms';
import styled from 'styled-components';
import { flexSet, commonLayOut } from '../../styles/mixin';

const HeaderSearch = () => {
  return (
    <HeaderSearchWrap>
      <SearchBackground>
        <SearchIcon alt="Search" src="/images/Search/search.png" />
        <SearchInput type="text" placeholder="검색어를 입력해 주세요." />
      </SearchBackground>
      <SearchTerms />
    </HeaderSearchWrap>
  );
};

const HeaderSearchWrap = styled.div`
  ${commonLayOut}
  padding: 10px 0;
`;

const SearchBackground = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
  padding: 10px 15px;
  margin: 0 10px;
  border-radius: 35px;
  background-color: ${props => props.theme.LightGray};
`;

const SearchIcon = styled.img`
  width: 18px;
  margin-right: 10px;
  opacity: 0.5;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;

  ::placeholder {
    color: ${props => props.theme.Gray};
    font-size: 15px;
  }
`;

export default HeaderSearch;
