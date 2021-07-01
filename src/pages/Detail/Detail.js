import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { commonLayOut, flexSet } from '../../styles/mixin';
import { PRODUCT_API, REVIEW_API } from '../../config';
import Map from '../../components/Map/Map';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import RecommendCard from '../../components/RecommendCard/RecommendCard';
import Footer from '../../components/Footer/Footer';

const Detail = () => {
  const [clicked, setClicked] = useState(false);
  const [productData, setProductData] = useState([]);
  const [reviewData, setReviewdata] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const [isReviewLoading, setIsReviewLoading] = useState(true);
  const history = useHistory();
  const match = useRouteMatch();
  const { productid: productId } = match.params;
  const authToken = localStorage.getItem('Token');

  useEffect(() => {
    axios({
      method: 'get',
      url: `${PRODUCT_API}/products/${productId}`,
      headers: {
        authorization: authToken,
      },
    })
      .then(res => {
        setProductData(res.data.result);
        setIsContentLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem('Token');
    axios({
      method: 'get',
      url: `${PRODUCT_API}/reviews/${productId}`,
      headers: {
        authorization: authToken,
      },
    })
      .then(res => {
        setReviewdata(res.data.result);
        setIsReviewLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const goBack = () => {
    history.goBack();
  };

  if (isContentLoading) {
    return (
      <LoadingWrapper>
        <Loading />
        <h1>데이터를 불러오는 중입니다...</h1>
      </LoadingWrapper>
    );
  }

  return (
    <>
      <DetailWrapper>
        <IconWrapper>
          <Icon alt="go back" src="/icon/left-arrow.png" onClick={goBack} />
          <Link to="/main">
            <Icon alt="home" src="/icon/home.png" />
          </Link>
        </IconWrapper>
        <DetailImage
          alt="main content"
          src={productData.Detail_info.product_image}
        />
        <ProductInfoWrapper>
          <ProductTitle>{productData.Detail_info.product_name}</ProductTitle>
          <ProductPrice>
            {parseInt(productData.Detail_info.product_price).toLocaleString()}원
          </ProductPrice>
          <ProductLimit>유효기간: 구매일로부터 90일까지</ProductLimit>
        </ProductInfoWrapper>
        <DivideLine />
        <ReviewWrapper>
          <ReviewTitle>
            <span>
              <StarRatings
                starRatedColor="red"
                rating={parseInt(productData.Detail_info.avg_score)}
                starDimension="15px"
                starSpacing="1px"
              />
            </span>
            <span>{productData.Detail_info.avg_score}</span>
            <span>{reviewData.length}개의 후기</span>
          </ReviewTitle>
          <ReviewListWrapper>
            {isReviewLoading ? (
              <Loading />
            ) : (
              reviewData.map((data, index) => {
                if (index < 2)
                  return (
                    <ReviewContentWrapper>
                      <ReviewPhoto alt="review pic" src={data.image_url} />
                      <section>
                        <ReviewWriterPhoto
                          alt="user pic"
                          src={data.user_image}
                        />
                        <ReviewWriter>{data.user}</ReviewWriter>
                      </section>
                      <ReviewContent>
                        {data.content.substring(0, 50)}...
                      </ReviewContent>
                    </ReviewContentWrapper>
                  );
              })
            )}
          </ReviewListWrapper>
          <ReviewLinkToList>
            <Link
              to={`/review/${productId}`}
              style={{ color: 'blue', textDecoration: 'none' }}
            >
              {reviewData.length}개의 후기 더 보기
            </Link>
          </ReviewLinkToList>
        </ReviewWrapper>
        <DivideLine />
        <ProductIntroduceWrapper>
          <Title>프립 소개</Title>
          <ProductIntroduceImage src={productData.Detail_info.description} />
        </ProductIntroduceWrapper>
        <DivideLine />
        <MapWrapper>
          <Title>진행 장소</Title>
          <Map address={productData.Detail_info.address} />
          <MapAddress>{productData.Detail_info.address}</MapAddress>
        </MapWrapper>
        <DivideLine />
        <RecommendWrapper>
          <Title>이런 드립은 어때요?</Title>
          <RecommendCardList>
            {productData.recommend.map((data, index) => {
              return (
                <RecommendCard
                  key={data.index}
                  id={data.product_id}
                  thumbnail={data.product_image}
                  listPrice={parseInt(data.product_price).toLocaleString()}
                  price={parseInt(data.discount).toLocaleString()}
                  grade={data.avg_score}
                  title={data.product_name}
                  address={data.address.slice(0, 2)}
                />
              );
            })}
          </RecommendCardList>
        </RecommendWrapper>
        <Footer />
      </DetailWrapper>
      <ConfirmWrapper>
        <Bookmark
          alt="bookmark"
          src={clicked ? '/icon/red_bookmark.png' : '/icon/black_bookmark.png'}
          onClick={handleClick}
        />
        <ConfirmButton>참여하기</ConfirmButton>
      </ConfirmWrapper>
    </>
  );
};

const LoadingWrapper = styled.section`
  height: 100vh;
  ${flexSet('column', 'center', 'center')};

  > h1 {
    padding-top: 20px;
    font-size: 20px;
    font-weight: 700;
  }
`;

const DetailWrapper = styled.section`
  ${commonLayOut}
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
  width: 100%;
  display: grid;
  grid-template-rows: repeat(1, 1fr);
`;

const ReviewTitle = styled.section`
  height: 50px;
  padding: 0 10px;
  ${flexSet('row', 'flex-start', 'center')}
  font-size: 15px;

  > span:not(:first-child) {
    padding: 0 3px;
  }
`;

const ReviewListWrapper = styled.section`
  width: 95%;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
`;

const ReviewContentWrapper = styled.section`
  ${flexSet('column')}

  >section {
    ${flexSet('row', 'center', 'center')}
    padding-top: 10px;
  }
`;

const ReviewPhoto = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
`;

const ReviewWriterPhoto = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ReviewWriter = styled.span`
  padding-left: 5px;
`;

const ReviewContent = styled.p`
  font-size: 15px;
  padding: 15px 0;
`;

const ReviewLinkToList = styled.section`
  height: 40px;
  ${flexSet('row', 'center', 'center')}
`;

const ProductIntroduceWrapper = styled.section`
  width: 100%;
`;

const ProductIntroduceImage = styled.img`
  width: 100%;
`;

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

const RecommendWrapper = styled.section``;

const RecommendCardList = styled.section`
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
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
