import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Map from '../../components/Map/Map';
import { flexSet } from '../../styles/mixin';

const Detail = () => {
  const location = useHistory();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(clicked ? 0 : 1);
  };

  const goBack = () => {
    location.goBack();
  };

  return (
    <>
      <DetailWrapper>
        <IconWrapper>
          <Icon alt="go back" src="/icon/left-arrow.png" onClick={goBack} />
          <Link to="/">
            <Icon alt="home" src="/icon/home.png" />
          </Link>
        </IconWrapper>
        <DetailImage alt="main content" src="/images/surfing.jpeg" />
        <ProductInfoWrapper>
          <ProductTitle>발리에서 서핑 여행을?</ProductTitle>
          <ProductPrice>24,000원</ProductPrice>
          <ProductLimit>유효기간: 구매일로부터 90일까지</ProductLimit>
        </ProductInfoWrapper>
        <DivideLine />
        <ReviewWrapper></ReviewWrapper>
        <DivideLine />
        <ProductIntroduceWrapper>
          <Title>프립 소개</Title>
        </ProductIntroduceWrapper>
        <DivideLine />
        <MapWrapper>
          <Title>진행 장소</Title>
          <Map address={'경기도 용인시 수지구 용구대로 2729'} />
          <MapAddress>경기도 용인시 수지구 용구대로 2729</MapAddress>
        </MapWrapper>
        <DivideLine />
        <RecommendWrapper>
          <Title>이런 드립은 어때요?</Title>
          <RecommendCardList></RecommendCardList>
        </RecommendWrapper>
      </DetailWrapper>
      <ConfirmWrapper>
        {clicked ? (
          <Bookmark
            alt="bookmark"
            src="/icon/red_bookmark.png"
            onClick={handleClick}
          />
        ) : (
          <Bookmark
            alt="bookmark"
            src="/icon/bookmark.png"
            onClick={handleClick}
          />
        )}

        <ConfirmButton>참여하기</ConfirmButton>
      </ConfirmWrapper>
    </>
  );
};

const DetailWrapper = styled.section`
  height: 100%;
  ${flexSet('column')}
`;

const IconWrapper = styled.section`
  width: 100%;
  position: absolute;
  padding: 15px 0;
  ${flexSet('row', 'space-between', 'center')};
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  padding: 0 10px;
  cursor: pointer;
`;

const DetailImage = styled.img`
  width: 100%;
`;

const ProductInfoWrapper = styled.section`
  padding: 24px 24px 24px;
`;

const ProductTitle = styled.p`
  font-size: 20px;
`;

const ProductPrice = styled.p`
  margin-top: 10px;
  font-size: 24px;
  font-weight: 700;
`;

const ProductLimit = styled.p`
  padding: 40px 0 5px 0;
  color: ${props => props.theme.Gray};
`;

const DivideLine = styled.div`
  width: 100%;
  border: 4px solid ${props => props.theme.LightGray};
`;

const ReviewWrapper = styled.section`
  height: 300px;
`;

const ProductIntroduceWrapper = styled.section``;

const Title = styled.p`
  padding: 25px 20px;
  font-size: 20px;
  font-weight: 700;
`;

const MapWrapper = styled.section`
  height: 420px;
  ${flexSet('column')}
`;

const MapAddress = styled.p`
  height: 100%;
  ${flexSet('row', 'flex-start', 'center')}
  font-size: 12px;
`;

const RecommendWrapper = styled.section`
  height: 350px;
`;

const RecommendCardList = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
`;

const ConfirmWrapper = styled.section`
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  ${flexSet('row', 'flex-start', 'center')};
  z-index: 200;
  background-color: white;
`;

const Bookmark = styled.img`
  width: 30px;
  height: 30px;
  padding: 0 20px;
`;

const ConfirmButton = styled.button`
  all: unset;
  width: 80%;
  height: 60%;
  border-radius: 10px;
  background-color: ${props => props.theme.Blue};
  text-align: center;
  font-size: 15px;
  color: white;
`;

export default Detail;
