import React from 'react';
import styled from 'styled-components';
import { commonLayOut } from '../../styles/mixin';

const Footer = () => {
  return (
    <FooterWrap>
      <CsCenter>
        <Title>고객센터</Title>
        <SubText>이메일: cs@frientrip.com</SubText>
        <SubText>고객센터: 02-512-3662</SubText>
        <SubText>업무시간: 평일 10:00-17:00 (점심: 12:00-13:00)</SubText>
      </CsCenter>
      <Frientrip>
        <Title>Frientrip</Title>
        <SubText>㈜프렌트립 | 사업자 등록번호 : 261-81-04385 </SubText>
        <SubText>통신판매업신고번호 : 2016-서울성동-01088 </SubText>
        <SubText>대표 : 임수열 | 개인정보 관리 책임자 : 김종광</SubText>
        <SubText>서울시 성동구 왕십리로 115 헤이그라운드 서울숲점 G605</SubText>
        <SubText>
          ㈜프렌트립은 통신판매중개자로서 거래당사자가 아니며, 호스트가 등록한
          상품정보 및 거래에 대해 ㈜프렌트립은 일체의 책임을 지지 않습니다.
        </SubText>
        <SubText>
          NICEPAY 안전거래 서비스 : 고객님의 안전거래를 위해 현금 결제 시, 저희
          사이트에서 가입한 구매안전 서비스를 이용할 수 있습니다.
        </SubText>
      </Frientrip>
    </FooterWrap>
  );
};

const FooterWrap = styled.div`
  ${commonLayOut}
  padding: 15px 0;
  background-color: ${props => props.theme.LightGray};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const CsCenter = styled.div`
  margin-top: 10px;
  padding: 0 10px 20px 10px;
  border-bottom: 1px solid ${props => props.theme.Gray};
`;

const Frientrip = styled.div`
  padding: 20px 10px 20px 10px;
`;

const SubText = styled.div`
  margin-top: 10px;
  color: ${props => props.theme.Gray};
  font-size: 11px;
  line-height: 130%;
`;

export default Footer;
