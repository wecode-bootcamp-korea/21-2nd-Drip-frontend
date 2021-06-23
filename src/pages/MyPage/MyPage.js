import React, { useState } from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const MyPage = () => {
  const [reserveData, setReserveData] = useState([]);
  const [pastReserveData, setPastReserveData] = useState([]);
  const [currentClicked, setCurrentClicked] = useState('current');

  const handleClick = e => {
    const {
      target: {
        dataset: { name },
      },
    } = e;
    setCurrentClicked(name);
  };

  return (
    <>
      <CommonWrapper>
        <UserInfoWrapper>
          <UserImage alt="user" src="/images/user_profile_sample.jpeg" />
          <Username>테스트</Username>
        </UserInfoWrapper>
      </CommonWrapper>
      <Divideline />
      <CommonWrapper>
        <ReservationInfoWrapper>
          <ReservationNav>
            <NavTab
              data-name="current"
              onClick={handleClick}
              style={{
                fontWeight: currentClicked === 'current' ? 'bold' : 400,
              }}
            >
              예약 내역
            </NavTab>
            <NavTab
              data-name="past"
              onClick={handleClick}
              style={{
                fontWeight: currentClicked === 'current' ? 'bold' : 400,
              }}
            >
              지난 예약
            </NavTab>
          </ReservationNav>
          {currentClicked === 'current' ? (
            reserveData.length > 0 ? (
              <ExistSection></ExistSection>
            ) : (
              <NotExistSection>
                <span>사용 가능한 예약이 없어요</span>
              </NotExistSection>
            )
          ) : pastReserveData.length > 0 ? (
            <ExistSection></ExistSection>
          ) : (
            <NotExistSection>
              <span>지난 예약이 없어요</span>
            </NotExistSection>
          )}
        </ReservationInfoWrapper>
      </CommonWrapper>
    </>
  );
};

const CommonWrapper = styled.section`
  ${flexSet('column', 'flex-start', 'flex-start')}
  padding: 30px 25px 0px;
`;

const UserInfoWrapper = styled.section`
  width: 100%;
  ${flexSet('row', 'flex-start', 'center')}
`;

const UserImage = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
`;

const Username = styled.span`
  margin-left: 10px;
  font-size: 19px;
  font-weight: 700;
`;

const Divideline = styled.div`
  width: 100%;
  border: 4px solid ${props => props.theme.LightGray};
  margin-top: 20px;
`;

const ReservationInfoWrapper = styled.section`
  width: 100%;
`;

const ReservationNav = styled.nav`
  ${flexSet('row', 'space-around', 'center')}
`;

const NavTab = styled.span`
  font-size: 15px;
  cursor: pointer;
`;

const ExistSection = styled.section``;

const NotExistSection = styled.section`
  height: 250px;
  ${flexSet('row', 'center', 'center')}
  color: ${props => props.theme.Gray};
  font-size: 12px;
`;

export default MyPage;
