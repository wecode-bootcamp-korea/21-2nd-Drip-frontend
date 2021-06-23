import React from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const Modal = () => (
  <ModalWrapper>
    <AlertWrapper>
      <AlertMessage>로그인 후 이용해주세요</AlertMessage>
      <ChooseWrapper>
        <CancelButton>취소</CancelButton>
        <ConfirmButton>확인</ConfirmButton>
      </ChooseWrapper>
    </AlertWrapper>
  </ModalWrapper>
);

const ModalWrapper = styled.section`
  width: 100vw;
  height: 100vh;
  ${flexSet('row', 'center', 'center')};
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0.9;
`;

const AlertWrapper = styled.section`
  width: 400px;
  height: 120px;
  max-width: 400px;
  ${flexSet('row', 'column', 'center')};
  border-radius: 3px;
  background-color: rgb(255, 255, 255);
  text-align: center;
`;

const AlertMessage = styled.section`
  height: 100%;
  ${flexSet('row', 'flex-start', 'center')};
  padding: 10px 0;
  font-weight: 500;
`;

const ChooseWrapper = styled.section`
  width: 100%;
  height: 100%;
  ${flexSet('row', 'space-between')};
  border-top: 1px solid #e6e6e6;
`;

const Button = styled.button`
  all: unset;
  width: 100%;
`;

const CancelButton = styled(Button)`
  border-right: 1px solid #e6e6e6;
`;

const ConfirmButton = styled(Button)`
  color: #3299ff;
  font-weight: 700;
`;

export default Modal;
