import React, { useState } from 'react';
import styled from 'styled-components';

const Main = () => {
  return <Wrapper></Wrapper>;
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100px;
  background-color: ${(props) => props.theme.background};
`;

export default Main;
