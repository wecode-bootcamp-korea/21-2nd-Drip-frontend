import React from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const BottomNav = () => (
  <BottomNavWrapper>
    <IconWrapper>
      <Icon alt="home" src="/Icon/home.png" />
      <IconTitle>홈</IconTitle>
    </IconWrapper>
    <IconWrapper>
      <Icon alt="Bookmark" src="/Icon/bookmark.png" />
      <IconTitle>찜</IconTitle>
    </IconWrapper>
    <IconWrapper>
      <Icon alt="My page" src="/Icon/my.png" />
      <IconTitle>마이</IconTitle>
    </IconWrapper>
    <IconWrapper>
      <Icon alt="Login" src="/Icon/login.png" />
      <IconTitle>로그인</IconTitle>
    </IconWrapper>
  </BottomNavWrapper>
);

const BottomNavWrapper = styled.section`
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f4f4f4;
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
