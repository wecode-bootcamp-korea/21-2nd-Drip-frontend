import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BottomNav from '../../components/BottomNav/BottomNav';
import { flexSet } from '../../styles/mixin';
import KakaoLogin from './KakaoLogin';

const Register = () => {
  const history = useHistory();
  return (
    <RegisterWrapper>
      <MessageWrapper>
        <MessageTitle>반가워요!</MessageTitle>
        <MessageContent>
          지금 드립 가입하시고
          <br />
          쿠폰 받아가세요
          <br />
          로그인과 회원가입을 한번에
          <br />⬇
        </MessageContent>
      </MessageWrapper>
      <LoginButtonWrapper>
        <KakaoLoginButton
          alt="login"
          src="/icon/kakao_login_medium_narrow.png"
          onClick={() => KakaoLogin(history)}
        ></KakaoLoginButton>
      </LoginButtonWrapper>
      <BottomNav />
    </RegisterWrapper>
  );
};

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

const LoginButtonWrapper = styled.section``;

const KakaoLoginButton = styled.img`
  all: unset;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  ${flexSet('row', 'center', 'center')};
`;

export default Register;
