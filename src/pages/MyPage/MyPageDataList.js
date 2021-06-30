import React from 'react';
import styled from 'styled-components';
import MyPageCard from '../../components/MyPageCard/MyPageCard';
import { flexSet } from '../../styles/mixin';

const MyPageDataList = props => {
  const { result } = props.data;

  return result.length > 0 ? (
    result.map((data, index) => {
      return <MyPageCard key={index} product={data} />;
    })
  ) : (
    <NotExistSection>
      <span>예약 내역이 없어요</span>
    </NotExistSection>
  );
};

const NotExistSection = styled.section`
  height: 250px;
  ${flexSet('row', 'center', 'center')}
  color: ${props => props.theme.Gray};
  font-size: 12px;
`;

export default MyPageDataList;
