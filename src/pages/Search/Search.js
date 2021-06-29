import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PopularSearch from '../../components/PopularSearch/PopularSearch';
import EmptySearchResult from '../../components/EmptySearchResult/EmptySearchResult';
import SearchResult from '../../components/SearchResult/SearchResult';
import styled from 'styled-components';
import { flexSet, commonLayOut } from '../../styles/mixin';
import { API } from '../../config';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isButtonOn, setIsButtonOn] = useState(false);
  const [searchResultArr, setSearchResultArr] = useState([]);
  const [popularTermsArr, setPopularTermsArr] = useState([]);
  const [popularSearchTermsOn, setPopularSearchTermsOn] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetch(`${API}/products/search?keyword=`)
      .then(res => res.json())
      .then(res => setPopularTermsArr(res.result.rank));
  }, []);

  const handleSearchInput = event => {
    const { value } = event.target;

    setIsButtonOn(value !== '');
    setSearchValue(value);
  };

  const enterSearch = event => {
    if (searchValue === '') {
      alert('검색어를 입력해 주세요');
      return;
    }

    event.key === 'Enter' && searchByTerm(searchValue);
  };

  const deleteValue = () => {
    setSearchValue('');
    setIsButtonOn(false);
  };

  const searchByTerm = term => {
    fetch(`${API}/products?search=${term}`)
      .then(res => res.json())
      .then(res => setSearchResultArr(res.result));

    setSearchTerm(term);
    setSearchValue('');
    setIsButtonOn(false);
    setPopularSearchTermsOn(false);
  };

  return (
    <SearchWrap>
      <SearchBackground>
        <SearchInputWrap>
          <SearchIcon alt="Search" src="/images/Search/search.png" />
          <SearchInput
            type="text"
            placeholder="검색어를 입력해 주세요."
            value={searchValue}
            onChange={event => handleSearchInput(event)}
            onFocus={event => handleSearchInput(event)}
            onKeyPress={event => enterSearch(event)}
            on
            autoFocus
          />
        </SearchInputWrap>
        <ButtonWrap>
          <DeleteButtonWrap
            onClick={deleteValue}
            className={isButtonOn && 'activeDeleteButton'}
          >
            <DeleteButton>X</DeleteButton>
          </DeleteButtonWrap>
          <SearchButton
            className={isButtonOn && 'activeSearchButton'}
            onClick={() => searchByTerm(searchValue)}
          >
            검색
          </SearchButton>
          <CancelButton onClick={() => history.goBack()}>취소</CancelButton>
        </ButtonWrap>
      </SearchBackground>
      <PopularSearch
        popularTermsArr={popularTermsArr}
        activated={popularSearchTermsOn}
      />
      {searchResultArr ? (
        <SearchResult term={searchTerm} searchResultArr={searchResultArr} />
      ) : (
        <EmptySearchResult />
      )}
    </SearchWrap>
  );
};

const SearchWrap = styled.div`
  position: relative;
  ${commonLayOut}
  padding: 10px 0;
`;

const SearchBackground = styled.div`
  ${flexSet('row', 'space-between', 'center')}
  padding: 10px 15px;
  margin: 0 10px;
  border-radius: 35px;
  color: ${props => props.theme.Gray};
`;

const SearchInputWrap = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
`;

const SearchIcon = styled.img`
  width: 14px;
  margin-right: 10px;
  opacity: 0.5;
`;

const SearchInput = styled.input`
  all: unset;
  width: 300px;
  color: black;

  &::placeholder {
    font-size: 14px;
  }
`;

const ButtonWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')}
`;

const DeleteButtonWrap = styled.div`
  visibility: hidden;
  width: 14px;
  height: 14px;

  &.activeDeleteButton {
    visibility: visible;
    ${flexSet('row', 'center', 'center')}
    margin-right: 10px;
    border: none;
    border-radius: 50%;
    background-color: rgb(200, 200, 200);
    cursor: pointer;
  }
`;

const DeleteButton = styled.button`
  all: unset;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const SearchButton = styled.button`
  all: unset;
  margin-right: 10px;
  color: black;
  font-size: 12px;

  &.activeSearchButton {
    cursor: pointer;
  }
`;

const CancelButton = styled.button`
  all: unset;
  color: black;
  font-size: 12px;
  cursor: pointer;
`;

export default Search;
