import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MainCard from '../../components/MainCard/MainCard';
import { API } from '../../config';
import { commonLayOut } from '../../styles/mixin';

const Bookmark = () => {
  const [bookmarkData, setBookMarkData] = useState([]);
  const {
    product_id: id,
    name: title,
    price,
    discount,
    image: thumbnail,
    new: isNew,
    hot: isHot,
    rating: grade,
  } = bookmarkData;

  useEffect(() => {
    fetch(`${API}/orders?page=1offset=0&limit=4`)
      .then(res => res.json())
      .then(res => setBookMarkData(res));
  }, []);

  return (
    <BookMarkWrapper>
      <CardListWrapper>
        <MainCard
          id={id}
          title={title}
          price={price}
          listPrice={parseInt(price) * (1 - discount)}
          thumbnail={thumbnail}
          isNew={isNew}
          isHot={isHot}
          grade={grade}
        />
      </CardListWrapper>
    </BookMarkWrapper>
  );
};

const BookMarkWrapper = styled.section`
  ${commonLayOut}
  padding: 10px 20px;
`;

const CardListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export default Bookmark;
