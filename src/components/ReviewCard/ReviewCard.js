import React from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const ReviewCard = () => (
  <Wrapper>
    <Image alt="review" src="/images/review_test_image.jpeg" />
    <ContentWrapper>
      <UserInfoWrapper>
        <UserProfileImage
          alt="profile"
          src="/images/user_profile_sample.jpeg"
        />
        <Username>테스트</Username>
      </UserInfoWrapper>
      <ReviewContent>
        너무 유익한 경험이었습니다. 겨울에 눈이 오면 또 와보고 싶어요.!
      </ReviewContent>
      <GoodIconWrapper>
        <GoodIcon alt="thumb up" src="/Icon/thumb_up.png" />
        <GoodIconCount>4</GoodIconCount>
      </GoodIconWrapper>
    </ContentWrapper>
  </Wrapper>
);

const Wrapper = styled.section`
  width: 220px;
  height: 220px;
`;

const Image = styled.img`
  border-radius: 3px;
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.section`
  ${flexSet('column')}
  margin-top: 15px;
`;

const UserInfoWrapper = styled.section`
  width: 100px;
  height: 40px;
  ${flexSet('row', 'space-between', 'center')};
`;

const UserProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const Username = styled.span`
  width: 100%;
  padding: 0 7px;
  font-size: 16px;
  font-weight: 700;
`;

const ReviewContent = styled.p`
  margin: 20px 0;
  line-height: 25px;
  font-size: 16px;
`;

const GoodIconWrapper = styled.div`
  width: 35px;
  height: 15px;
  ${flexSet('row', 'space-evenly', 'center')};
  padding: 7px 10px;
  border-radius: 20px;
  border: 1px solid rgb(221, 221, 221);
  font-size: 15px;
`;

const GoodIcon = styled.img`
  width: 15px;
`;

const GoodIconCount = styled.span`
  padding-top: 3px;
`;

export default ReviewCard;
