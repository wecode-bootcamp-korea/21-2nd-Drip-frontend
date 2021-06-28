import React from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const EmptySearchResult = () => {
  return (
    <EmptySearchResultWrap>
      <QuestionIcon alt="question icon" src="/images/Search/search.png" />
      <Notice>검색 결과가 없어요.</Notice>
      <Notice>다른 검색어로 검색해 주세요!</Notice>
    </EmptySearchResultWrap>
  );
};

const EmptySearchResultWrap = styled.section`
  ${flexSet('column', 'flex-start', 'center')};
  height: 100vh;
  padding-top: 70px;
`;

const QuestionIcon = styled.img`
  width: 50px;
  margin-bottom: 20px;
  opacity: 0.3;
`;

const Notice = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.Gray};
`;

export default EmptySearchResult;
