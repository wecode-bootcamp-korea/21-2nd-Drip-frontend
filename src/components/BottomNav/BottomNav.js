import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { flexSet } from '../../styles/mixin';

const BottomNav = () => {
  const currentToken = localStorage.getItem('Token');
  const history = useHistory();

  const handleLogout = () => {
    if (!window.Kakao.Auth.getAccessToken()) {
      return;
    }
    window.Kakao.Auth.logout(function () {
      localStorage.removeItem('Token');
      alert('로그아웃 되었습니다');
      // 일단 경고창 뜨게하고 추후 시간 남으면 모달창으로 대체
      history.push('/');
    });
  };

  return (
    <BottomNavWrapper>
      <StyledLink to="/">
        <IconWrapper>
          <Icon alt="home" src="/Icon/home.png" />
          <IconTitle>홈</IconTitle>
        </IconWrapper>
      </StyledLink>
      <StyledLink to={currentToken ? '/bookmark' : '/register'}>
        <IconWrapper>
          <Icon alt="Bookmark" src="/Icon/black_bookmark.png" />
          <IconTitle>찜</IconTitle>
        </IconWrapper>
      </StyledLink>
      <StyledLink to={currentToken ? '/mypage' : '/register'}>
        <IconWrapper>
          <Icon alt="My page" src="/Icon/my.png" />
          <IconTitle>마이</IconTitle>
        </IconWrapper>
      </StyledLink>
      {currentToken ? (
        <StyledLink onClick={handleLogout}>
          <IconWrapper>
            <Icon alt="Logout" src="/Icon/logout.png" />
            <IconTitle>로그아웃</IconTitle>
          </IconWrapper>
        </StyledLink>
      ) : (
        <StyledLink to="/register">
          <IconWrapper>
            <Icon alt="Login" src="/Icon/login.png" />
            <IconTitle>로그인</IconTitle>
          </IconWrapper>
        </StyledLink>
      )}
    </BottomNavWrapper>
  );
};

const BottomNavWrapper = styled.section`
  width: 485px;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f4f4f4;
  background-color: #ffffff;
  z-index: 100;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const IconWrapper = styled.section`
  ${flexSet('column', 'center', 'center')}
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  padding: 2px 0;
`;

const IconTitle = styled.span`
  margin-top: 4px;
  font-size: 10px;
  text-align: center;
`;

export default BottomNav;
