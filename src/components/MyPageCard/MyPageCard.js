import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const MyPageCard = product => {
  const history = useHistory();

  return (
    <MainCardWrap onClick={() => history.push(`/detail/${product.product.id}`)}>
      <ThumbnailWrap>
        <Thumbnail alt="product thumbnail" src={product.product.image} />
      </ThumbnailWrap>
      <ContentsWrap>
        <Title>{product.product.name}</Title>
        <Price>{parseInt(product.product.price).toLocaleString()}원 </Price>
        <Informations>
          {product.product.grade !== '0' && (
            <GradeWrap>
              ★<Grade>{product.product.rating.slice(0, 4)}</Grade>
            </GradeWrap>
          )}
          {parseInt(product.product.isNew) ? <NewFlag>NEW</NewFlag> : null}
          {parseInt(product.product.isHot) ? <HotFlag>HOT</HotFlag> : null}
        </Informations>
      </ContentsWrap>
    </MainCardWrap>
  );
};

const MainCardWrap = styled.div`
  cursor: pointer;
`;

const ContentsWrap = styled.div`
  margin: 15px 0;
  font-size: 13px;
`;

const ThumbnailWrap = styled.div`
  position: relative;
`;

const Thumbnail = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const Title = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
  line-height: 150%;
`;

const Price = styled.div`
  padding-bottom: 10px;
  font-weight: bold;
`;

const Informations = styled.div`
  ${flexSet('row', 'flex-start', 'flex-end')}
`;

const GradeWrap = styled.div`
  margin-right: 7px;
  color: ${props => props.theme.SignitureColor};
  font-size: 14px;
`;

const Grade = styled.span`
  margin-left: 3px;
  color: ${props => props.theme.Gray};
`;

const NewFlag = styled.span`
  margin-right: 3px;
  padding: 3px 5px;
  border-radius: 3px;
  background-color: ${props => props.theme.SignitureColor};
  color: #ffffff;
  font-size: 10px;
`;

const HotFlag = styled.span`
  margin-right: 3px;
  padding: 3px 5px;
  border-radius: 3px;
  background-color: ${props => props.theme.HotPink};
  color: #ffffff;
  font-size: 10px;
`;

export default MyPageCard;
