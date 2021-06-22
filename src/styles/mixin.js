import { css } from 'styled-components';

export const flexSet = (
  direction = 'row',
  justify = 'flex-start',
  align = 'flex-start'
) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export const twoRowCardSet = () => css`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

export const commonLayOut = () => css`
  margin: 0 auto;
  width: 485px;
  border-right: 1px solid #f4f4f4;
  border-left: 1px solid #f4f4f4;
`;
