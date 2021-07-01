import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import { commonLayOut, flexSet } from '../../styles/mixin';
import { LOGIN_API } from '../../config';

const ReviewListCard = props => {
  const { data, index } = props;

  const handleLike = async () => {
    const authToken = localStorage.getItem('Token');
    await axios({
      method: 'post',
      url: `${LOGIN_API}/reviews/like`,
      headers: {
        authorization: authToken,
      },
      data: {
        review_id: index + 1,
      },
    }).then(res => console.log(res));
  };

  const handleLikeRemove = async () => {
    const authToken = localStorage.getItem('Token');
    await axios({
      method: 'delete',
      url: `${LOGIN_API}/reviews/like/1`,
      headers: {
        authorization: authToken,
      },
    }).then(res => console.log(res));
  };

  return (
    <ReviewWrapper>
      <DivideLine />
      <ReviewContentWrapper>
        <div>
          <UserImage alt="user profile" src={data.user_image} />
          <UserRatingWrapper>
            <UserName>{data.user}</UserName>
            <StarRatings
              starRatedColor="red"
              rating={parseInt(data.rating)}
              starDimension="10px"
              starSpacing="0px"
            />
          </UserRatingWrapper>
        </div>
        <div>
          <ReviewContent>{data.content}</ReviewContent>
        </div>
        <div>
          <RecommendSpan
            onClick={data.like ? handleLikeRemove : handleLike}
            style={{ color: data.like ? 'blue' : 'lightgray' }}
          >
            도움이 됐어요 {data.like_count}명
          </RecommendSpan>
        </div>
        <div>
          <Thumbnail alt="review img" src={data.image_url}></Thumbnail>
        </div>
      </ReviewContentWrapper>
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.section`
  ${commonLayOut}
  padding: 10px 0;
`;

const DivideLine = styled.div`
  margin: 15px 0;
  border-bottom: 1px solid ${props => props.theme.LightGray};
`;

const ReviewContentWrapper = styled.section`
  padding: 0 15px;

  > div:first-child {
    ${flexSet('row', 'flex-start', 'center')}
  }

  > div:nth-child(3) {
    ${flexSet('row', 'flex-end')}
  }
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const UserRatingWrapper = styled.section`
  padding-left: 10px;
  ${flexSet('column')}
`;

const UserName = styled.p`
  font-weight: 700;
`;

const Rating = styled.p``;

const ReviewContent = styled.p`
  padding: 10px 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const RecommendSpan = styled.span`
  font-size: 12px;
  color: ${props => props.theme.Gray};
  cursor: pointer;
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
`;

export default ReviewListCard;
