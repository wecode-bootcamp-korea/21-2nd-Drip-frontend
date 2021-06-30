import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import Footer from '../../components/Footer/Footer';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import Loading from '../../components/Loading/Loading';
import ReviewListCard from '../../components/ReviewListCard/ReviewListCard';
import { API } from '../../config';
import { commonLayOut, flexSet } from '../../styles/mixin';

const Review = () => {
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('Token');
        const result = await axios({
          method: 'get',
          url: `${API}/reviews/1`,
          headers: {
            authorization: authToken,
          },
        });
        setReviewList(result.data.result);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  ) : (
    <ReviewWrapper>
      <HeaderSearch />
      <ReviewHeader>
        <HeaderLeftSide>
          <p>후기 {reviewList.length}개</p>
          <p>
            <StarRatings
              starRatedColor="red"
              rating={4}
              starDimension="17px"
              starSpacing="0px"
            />
            <span>4</span>
          </p>
        </HeaderLeftSide>
        <HeaderRightSide>
          <select name="choice">
            <option value="new">최신순</option>
            <option value="help">도움순</option>
          </select>
        </HeaderRightSide>
      </ReviewHeader>
      {reviewList.length > 0 &&
        reviewList.reverse().map((result, index) => {
          return <ReviewListCard key={index} data={result} index={index} />;
        })}
      <Footer />
    </ReviewWrapper>
  );
};

const LoadingWrapper = styled.section`
  ${commonLayOut}
  ${flexSet('row', 'center', 'center')}
`;

const ReviewWrapper = styled.section`
  ${commonLayOut}
  ${flexSet('column')}
`;

const ReviewHeader = styled.header`
  padding: 5px 15px;
  ${flexSet('row', 'space-between', 'flex-start')};
`;

const HeaderLeftSide = styled.section`
  ${flexSet('column', 'center', 'flex-start')};

  > p:first-child {
    font-size: 20px;
    font-weight: 700;
  }

  > p:last-child {
    padding-top: 15px;
    font-size: 14px;

    > span {
      padding-left: 5px;
      font-size: 12px;
      font-weight: 800;
      color: ${props => props.theme.Gray};
    }
  }
`;

const HeaderRightSide = styled.section``;

export default Review;
