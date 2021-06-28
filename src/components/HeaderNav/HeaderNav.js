import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const HeaderNav = () => {
  const location = useLocation().pathname;

  return (
    <HeaderNavWrap>
      <NavListWrap>
        <NavList>
          <NavLink className={location === '/main' && 'activateOn'} to="/main">
            추천
          </NavLink>
        </NavList>
        <NavList>
          <NavLink
            className={location === '/activity' && 'activateOn'}
            to="/activity"
          >
            액티비티
          </NavLink>
        </NavList>
        <NavList>
          <NavLink
            className={location === '/learning' && 'activateOn'}
            to="/learning"
          >
            배움
          </NavLink>
        </NavList>
      </NavListWrap>
    </HeaderNavWrap>
  );
};

const HeaderNavWrap = styled.div`
  position: sticky;
  top: 0;
  width: 485px;
  background-color: #ffffff;
  z-index: 100;
`;

const NavListWrap = styled.ul`
  ${flexSet('row', 'center')}
  padding: 0 10px;
  border-bottom: 1px solid ${props => props.theme.LightGray};
`;

const NavList = styled.li`
  flex-grow: 1;
  padding: 15px 0;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.Gray};
  text-decoration: none;

  &.activateOn {
    color: ${props => props.theme.SignitureColor};
  }
`;

export default HeaderNav;
