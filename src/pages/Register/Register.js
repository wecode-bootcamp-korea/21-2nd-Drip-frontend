import React from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const Register = () => (
  <RegisterWrapper>
    <MessageWrapper>
      <MessageTitle>반가워요!</MessageTitle>
      <MessageContent>
        지금 드립 가입하시고
        <br />
        쿠폰 받아가세요
      </MessageContent>
    </MessageWrapper>
    <LoginButtonWrapper>
      <KakaoLoginButton>카카오톡으로 시작</KakaoLoginButton>
      <GoogleLoginButton>구글로 시작</GoogleLoginButton>
      <LoginButton>로그인</LoginButton>
    </LoginButtonWrapper>
  </RegisterWrapper>
);

const RegisterWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  ${flexSet('column', 'center', 'center')}
`;

const MessageWrapper = styled.section`
  ${flexSet('column', 'flex-start', 'center')}
`;

const MessageTitle = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const MessageContent = styled.span`
  padding: 10px 0;
  text-align: center;
  line-height: 22px;
  color: #c7c7c7;
`;

const LoginButtonWrapper = styled.section`
  width: 280px;
  ${flexSet('column')};
`;

const Button = styled.button`
  all: unset;
  width: 100%;
  height: 48px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const KakaoLoginButton = styled(Button)`
  background-color: ${props => props.theme.Yellow};
`;

const GoogleLoginButton = styled(Button)`
  background-color: ${props => props.theme.LightGray};
`;

const LoginButton = styled(Button)`
  border: 1px solid ${props => props.theme.White};
`;

export default Register;
