import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { commonLayOut, flexSet } from '../../styles/mixin';
import { API } from '../../config';
import MyPageDataList from './MyPageDataList';

const MyPage = () => {
  const [reserveData, setReserveData] = useState([]);
  const [pastReserveData, setPastReserveData] = useState([]);
  const [currentClicked, setCurrentClicked] = useState('current');

  useEffect(() => {
    fetch(`${API}/orders?status=2&page=1`)
      .then(res => res.json())
      .then(res => setReserveData(res));
  }, []);

  useEffect(() => {
    fetch(`${API}/orders?status=3&page=1`)
      .then(res => res.json())
      .then(res => setPastReserveData(res));
  }, []);

  const handleClick = e => {
    const {
      target: {
        dataset: { name },
      },
    } = e;
    setCurrentClicked(name);
  };

  return (
    <MyPageWrapper>
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
                fontWeight: currentClicked === 'past' ? 'bold' : 400,
              }}
            >
              지난 예약
            </NavTab>
          </ReservationNav>
          {currentClicked === 'current' ? (
            <MyPageDataList data={reserveData} />
          ) : (
            <MyPageDataList data={pastReserveData} />
          )}
        </ReservationInfoWrapper>
      </CommonWrapper>
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled.section`
  ${commonLayOut}
`;

const CommonWrapper = styled.section`
  ${flexSet('column', 'flex-start', 'flex-start')}
  width: 100%;
  padding: 10px 0px;
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
  border: 2px solid ${props => props.theme.LightGray};
  margin: 10px 0;
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
