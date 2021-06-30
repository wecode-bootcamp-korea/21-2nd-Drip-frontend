import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { commonLayOut, flexSet } from '../../styles/mixin';
import { MyPage_API } from '../../config';
import MyPageDataList from './MyPageDataList';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import BottomNav from '../../components/BottomNav/BottomNav';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reserveData, setReserveData] = useState([]);
  const [pastReserveData, setPastReserveData] = useState([]);
  const [currentClicked, setCurrentClicked] = useState('current');
  const authToken = localStorage.getItem('Token');

  useEffect(() => {
    axios({
      method: 'get',
      url: `${MyPage_API}/orders?status=2&offset=0&limit=4`,
      headers: {
        authorization: authToken,
      },
    }).then(res => {
      setReserveData(res.data.result);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${MyPage_API}/orders?status=3&offset=0&limit=4`,
      headers: {
        authorization: authToken,
      },
    }).then(res => {
      setPastReserveData(res.data.result);
    });
  }, []);

  const handleClick = e => {
    const {
      target: {
        dataset: { name },
      },
    } = e;
    setCurrentClicked(name);
  };

  if (isLoading) return <Loading />;
  return (
    <MyPageWrapper>
      <HeaderSearch />
      <CommonWrapper>
        <UserInfoWrapper>
          <UserImage alt="user" src={reserveData.user_info.profile_image} />
          <Username>{reserveData.user_info.name}</Username>
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
          <ExistSection>
            {currentClicked === 'current' ? (
              <MyPageDataList data={reserveData} />
            ) : (
              <MyPageDataList data={pastReserveData} />
            )}
          </ExistSection>
        </ReservationInfoWrapper>
      </CommonWrapper>
      <BottomNav />
    </MyPageWrapper>
  );
};

const MyPageWrapper = styled.section`
  ${commonLayOut}
  height: 100vh;
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
  margin-left: 10px;
  border-radius: 50%;
`;

const Username = styled.span`
  margin-left: 10px;
  font-size: 19px;
  font-weight: 700;
`;

const Divideline = styled.div`
  width: 100%;
  border: 1px solid ${props => props.theme.LightGray};
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

const ExistSection = styled.section`
  padding: 30px 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const NotExistSection = styled.section`
  height: 250px;
  ${flexSet('row', 'center', 'center')}
  color: ${props => props.theme.Gray};
  font-size: 12px;
`;

export default MyPage;
