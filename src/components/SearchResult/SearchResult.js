import React from 'react';
import MainCard from '../MainCard/MainCard';
import Footer from '../Footer/Footer';
import styled from 'styled-components';
import { flexSet, twoRowCardSet } from '../../styles/mixin';

const SearchResult = searchResultArr => {
  return (
    <SearchResultWrap>
      <TitleWrap>
        <Title>검색 결과 {searchResultArr.length}</Title>
      </TitleWrap>
      <DripWrap>
        {searchResultArr.searchResultArr.map(list => {
          return (
            <MainCard
              key={list.product_id}
              id={list.product_id}
              title={list.product_name}
              listPrice={parseInt(list.product_price).toLocaleString()}
              price={parseInt(
                list.discount === '1'
                  ? list.product_price
                  : list.product_price * (1 - list.discount)
              ).toLocaleString()}
              region={list.adress}
              isNew={list.new_tag}
              isHot={list.hot_tag}
              grade={list.avg_score}
              thumbnail={list.product_image}
            />
          );
        })}
      </DripWrap>
      <Footer />
    </SearchResultWrap>
  );
};

const SearchResultWrap = styled.section`
  position: relative;
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

export default SearchResult;
