import React from 'react';
import styled from 'styled-components';
import { commonLayOut, flexSet } from '../../styles/mixin';

const ReviewListCard = () => {
  return (
    <ReviewWrapper>
      <ReviewHeader>
        <HeaderLeftSide>
          <p>후기 105개</p>
          <p>평균 평점 4.8</p>
        </HeaderLeftSide>
        <HeaderRightSide>
          <select name="choice">
            <option value="new">최신순</option>
            <option value="help">도움순</option>
          </select>
        </HeaderRightSide>
      </ReviewHeader>
      <DivideLine />
      <ReviewContentWrapper>
        <div>
          <UserImage />
          <UserRatingWrapper>
            <UserName>테스트</UserName>
          </UserRatingWrapper>
        </div>
        <div>
          <ReviewContent>
            편안한 목소리로 이론수업 자세히 지루하지않게 열심히 해주시고 실습도
            주변에 다이빙이나 스킨스쿠버하는사람이 적지않아서 시끄럽고
            정신없었는데 너무 차분히 든든하게 침착하게 잘알려주시고 물속에서의
            강사님은 한마리의 바다표범같이 너무 자유롭고 편해보이셔서 넘
            멋졌어요~^^저도 열심히해서 물속에서 자유롭게 수영하고싶네요ㅎㅎ
          </ReviewContent>
        </div>
        <div>
          <RecommendSpan>도움이 됐어요 3명</RecommendSpan>
        </div>
        <div>
          <Thumbnail></Thumbnail>
          <Thumbnail></Thumbnail>
        </div>
      </ReviewContentWrapper>
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.section`
  ${commonLayOut}
  padding: 20px 0;
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
  }
`;

const HeaderRightSide = styled.section``;

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

const ReviewContent = styled.p`
  padding: 10px 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const RecommendSpan = styled.span`
  font-size: 12px;
  color: ${props => props.theme.Gray};
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;

  &:not(:first-child) {
    padding-left: 10px;
  }
`;

export default ReviewListCard;
