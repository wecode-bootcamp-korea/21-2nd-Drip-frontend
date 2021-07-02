import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BottomNav from '../../components/BottomNav/BottomNav';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import Loading from '../../components/Loading/Loading';
import BookmarkCard from '../../components/BookmarkCard/BookmarkCard';
import { API } from '../../config';
import { commonLayOut, flexSet } from '../../styles/mixin';
import MainCard from '../../components/MainCard/MainCard';

const Bookmark = () => {
  const [bookmarkData, setBookMarkData] = useState([]);
  const [isLoading, SetIsLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem('Token');
    try {
      axios(`${API}/orders/bookmark?offset=0&limit=4`, {
        headers: {
          Authorization: authToken,
        },
      }).then(res => {
        console.log(res.data);
        setBookMarkData(res.data.result);
      });
    } catch (error) {
      console.error(error);
    }
    SetIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <LoadingWrapper>
        <Loading />
        <h1>데이터를 불러오는 중입니다...</h1>
      </LoadingWrapper>
    );

  return (
    <BookMarkWrapper>
      <HeaderSearch />
      <CardListWrapper>
        {bookmarkData.result &&
          bookmarkData.result.map((data, index) => {
            return (
              <BookmarkCard
                key={index}
                id={data.product_id}
                title={data.name}
                price={parseInt(
                  data.price * (1 - data.discount)
                ).toLocaleString()}
                listPrice={parseInt(data.price).toLocaleString()}
                thumbnail={data.image}
                isNew={data.new}
                isHot={data.hot}
                grade={data.rating.slice(0, 3)}
              />
            );
          })}
      </CardListWrapper>
      <BottomNav />
    </BookMarkWrapper>
  );
};

const LoadingWrapper = styled.section`
  height: 100vh;
  ${flexSet('column', 'center', 'center')}

  > h1 {
    padding-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;

const BookMarkWrapper = styled.section`
  ${commonLayOut}
`;

const CardListWrapper = styled.section`
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;

  &:nth-child(1, 2) {
    padding-top: 20px;
  }
`;

export default Bookmark;
