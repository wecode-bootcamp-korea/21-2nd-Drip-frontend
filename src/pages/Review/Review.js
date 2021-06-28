import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
        const result = await axios.get(`${API}/review`);
        setReviewList(result);
      } catch (err) {
        console.log(err);
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
    <ReviewListCard data={reviewList} />
  );
};

const LoadingWrapper = styled.section`
  ${commonLayOut}
  ${flexSet('row', 'center', 'center')}
`;

export default Review;
