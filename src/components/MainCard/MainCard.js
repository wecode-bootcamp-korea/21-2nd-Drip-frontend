import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';
import { API } from '../../config';

const MainCard = product => {
  const [isBookMarked, setIsBookMarked] = useState(false);
  const history = useHistory();

  const handleBookMark = e => {
    e.stopPropagation();

    if (localStorage.getItem('Token')) {
      setIsBookMarked(!isBookMarked);
      fetch(`${API}/orders`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('Token'),
        },
        body: JSON.stringify({
          product_id: product.id,
          status: 1,
        }),
      });
    } else {
      alert('로그인 후 사용이 가능합니다.');
      history.push('/login');
    }
  };

  return (
    <MainCardWrap onClick={() => history.push(`/detail/${product.id}`)}>
      <ThumbnailWrap>
        <Thumbnail alt="product thumbnail" src={product.thumbnail} />
        <Location>{product.region}</Location>
        <Bookmark
          alt="Bookmark Icon"
          src={
            isBookMarked
              ? '/images/mainCard/bookmark-black.png'
              : '/images/mainCard/bookmark-white.png'
          }
          onClick={handleBookMark}
        />
      </ThumbnailWrap>
      <ContentsWrap>
        <Title>{product.title}</Title>
        <Price>
          {product.price}원{' '}
          <ListPrice>
            {product.listPrice !== product.price && product.listPrice}
          </ListPrice>
        </Price>
        <Informations>
          {product.grade !== '0' && (
            <GradeWrap>
              ★<Grade>{product.grade}</Grade>
            </GradeWrap>
          )}
          {parseInt(product.isNew) ? <NewFlag>NEW</NewFlag> : null}
          {parseInt(product.isHot) ? <HotFlag>HOT</HotFlag> : null}
        </Informations>
      </ContentsWrap>
    </MainCardWrap>
  );
};

const MainCardWrap = styled.div`
  cursor: pointer;
`;

const ContentsWrap = styled.div`
  margin: 15px 0;
  font-size: 13px;
`;

const ThumbnailWrap = styled.div`
  position: relative;
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const Bookmark = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  filter: invert(100%);
`;

const Location = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;

const Title = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
  line-height: 150%;
`;

const Price = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
`;

const ListPrice = styled.span`
  color: ${props => props.theme.Gray};
  font-size: 12px;
  font-weight: normal;
  text-decoration: line-through;
`;

const Informations = styled.div`
  ${flexSet('row', 'flex-start', 'flex-end')}
`;

const GradeWrap = styled.div`
  margin-right: 7px;
  color: ${props => props.theme.SignitureColor};
  font-size: 14px;
`;

const Grade = styled.span`
  margin-left: 3px;
  color: ${props => props.theme.Gray};
`;

const NewFlag = styled.span`
  margin-right: 3px;
  padding: 3px 5px;
  border-radius: 3px;
  background-color: ${props => props.theme.SignitureColor};
  color: #ffffff;
  font-size: 10px;
`;

const HotFlag = styled.span`
  margin-right: 3px;
  padding: 3px 5px;
  border-radius: 3px;
  background-color: ${props => props.theme.HotPink};
  color: #ffffff;
  font-size: 10px;
`;

export default MainCard;
