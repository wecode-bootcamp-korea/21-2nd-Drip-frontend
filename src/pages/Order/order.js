import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import Footer from '../../components/Footer/Footer';
import Loading from '../../components/Loading/Loading';
import { flexSet, commonLayOut } from '../../styles/mixin';
import { API } from '../../config';

const Order = props => {
  const [itemData, setItemData] = useState([]);
  const [fullAddress, setFullAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [seletedDate, setSelectedDate] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [personnelCount, setPersonnelCount] = useState(1);
  const [isContentLoading, setIsContentLoading] = useState(true);
  const history = useHistory();
  const productId = props.location.state.productId;

  useEffect(() => {
    fetch(`${API}/products/${productId}`)
      .then(res => res.json())
      .then(res => {
        setItemData(res.result);
        setIsContentLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsFormFilled(fullAddress && seletedDate && detailAddress);
  }, [fullAddress, seletedDate, detailAddress]);

  const selectDate = event => {
    const { value } = event.target;

    setSelectedDate(value);
  };

  const findPostCode = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        setFullAddress(
          data.userSelectedType === 'R' ? data.address : data.jibunAddress
        );
        setPostCode(data.zonecode);
      },
    }).open();
  };

  const getDatailAddress = event => {
    const { value } = event.target;

    setDetailAddress(value);
  };

  const handlePersonnelCount = word => {
    if (personnelCount === 1 && word === 'minus') {
      return;
    }

    setPersonnelCount(
      word === 'plus' ? personnelCount + 1 : personnelCount - 1
    );
  };

  const joinItem = () => {
    if (
      window.confirm(
        `${seletedDate} ${personnelCount}??? ?????? ?????????????????????????`
      ) === true
    ) {
      fetch(`${API}/orders`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('Token'),
        },
        body: JSON.stringify({
          product_id: productId,
          status: 2,
        }),
      });

      history.push('/main');
    } else {
      alert('????????? ?????????????????????.');
    }
  };

  if (isContentLoading) {
    return (
      <LoadingWrapper>
        <Loading />
        <h1>???????????? ???????????? ????????????...</h1>
      </LoadingWrapper>
    );
  }

  return (
    <OrderWrap>
      <HeaderSearch />
      <ContentsWrap>
        <Title>????????????</Title>
        <ItemInformation>
          <ItemImage
            alt="Item Thumbnail"
            src={itemData.Detail_info.product_image}
          />
          <ItemDetailWrap>
            <ItemName>{itemData.Detail_info.product_name}</ItemName>
            <PriceWrap>
              {parseInt(
                itemData.Detail_info.discount !== '1' &&
                  itemData.Detail_info.discount
              ).toLocaleString()}
              ???{' '}
              <ListPrice>
                {parseInt(itemData.Detail_info.product_price).toLocaleString()}
              </ListPrice>
            </PriceWrap>
          </ItemDetailWrap>
        </ItemInformation>
        <SelectOrderForm>
          <OrderDateWrap>
            <SelectTitle>?????? ??????</SelectTitle>
            <select onChange={event => selectDate(event)}>
              <option value="">????????? ????????? ?????????.</option>
              <option value="7??? 10???(???)">7??? 10???(???)</option>
              <option value="7??? 11???(???)">7??? 11???(???)</option>
              <option value="7??? 17???(???)">7??? 17???(???)</option>
              <option value="7??? 18???(???)">7??? 18???(???)</option>
            </select>
          </OrderDateWrap>
          <PersonnelWrap>
            <SelectTitle>?????? ??????</SelectTitle>
            <PersonnelCountWrap>
              <PersonnelCountButton
                onClick={() => handlePersonnelCount('minus')}
              >
                -
              </PersonnelCountButton>
              <PersonnelCount>{personnelCount}</PersonnelCount>
              <PersonnelCountButton
                onClick={() => handlePersonnelCount('plus')}
              >
                +
              </PersonnelCountButton>
            </PersonnelCountWrap>
          </PersonnelWrap>
          <AddressWrap>
            <SelectTitle>
              ????????? ??????<Notice>*????????? ?????? ?????? ??????</Notice>
            </SelectTitle>
            <PostSearchWrap>
              <PostCodeInput>{postCode}</PostCodeInput>
              <PostCodeSearchButton onClick={findPostCode}>
                ???????????? ??????
              </PostCodeSearchButton>
            </PostSearchWrap>
            <AdressInput>{fullAddress}</AdressInput>
            <AdressInput>
              <ExtraAdressInput
                onChange={event => getDatailAddress(event)}
                value={detailAddress}
                placeholder="?????? ????????? ????????? ?????????."
              />
            </AdressInput>
          </AddressWrap>
        </SelectOrderForm>
        <OrderButton
          disabled={!isFormFilled}
          className={isFormFilled && 'activeOn'}
          onClick={joinItem}
        >
          ????????????
        </OrderButton>
      </ContentsWrap>
      <Footer />
    </OrderWrap>
  );
};

const OrderWrap = styled.section`
  ${commonLayOut}
`;

const LoadingWrapper = styled.section`
  height: 100vh;
  /* width: 100%; */
  ${flexSet('column', 'center', 'center')};

  > h1 {
    padding-top: 20px;
    font-size: 20px;
    font-weight: 700;
  }
`;

const ContentsWrap = styled.div`
  margin-bottom: 15px;
  padding: 25px 10px;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const ItemInformation = styled.div`
  ${flexSet('row', 'flex-start', 'center')};
  padding: 10px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const ItemImage = styled.img`
  width: 130px;
  border-radius: 5px;
`;

const ItemDetailWrap = styled.div`
  ${flexSet('column', 'center', 'flex-start')};
  margin-left: 10px;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 120%;
`;

const PriceWrap = styled.div`
  margin-top: 8px;
  font-size: 14px;
`;

const ListPrice = styled.span`
  color: ${props => props.theme.Gray};
  font-size: 12px;
  text-decoration: line-through;
`;

const SelectOrderForm = styled.div`
  margin: 20px 0;
`;

const OrderDateWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')};
  padding: 20px 0 10px 0;
`;

const SelectTitle = styled.div`
  margin-bottom: 10px;
  font-weight: bold;
`;

const PersonnelWrap = styled.div`
  ${flexSet('row', 'space-between', 'center')};
  padding: 10px 0;
`;

const PersonnelCountWrap = styled.div`
  ${flexSet('row', 'space-between', 'flex-start')};
  width: 130px;
  margin-top: 15px;
`;

const PersonnelCountButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const PersonnelCount = styled.div`
  font-weight: bold;
`;

const AddressWrap = styled.div`
  padding: 10px 0;
`;

const Notice = styled.span`
  margin-left: 10px;
  font-size: 10px;
  font-weight: normal;
`;

const PostSearchWrap = styled.div`
  ${flexSet('row', 'flex-start', 'center')}
`;

const PostCodeInput = styled.div`
  width: 150px;
  height: 18px;
  padding-left: 3px;
  margin-right: 10px;
  border: 1px solid black;
  font-size: 13px;
  line-height: 18px;
`;
const PostCodeSearchButton = styled.button`
  border: 1px solid black;
  font-size: 13px;
  cursor: pointer;
`;
const AdressInput = styled.div`
  height: 18px;
  padding-left: 3px;
  margin: 5px 0;
  border: 1px solid black;
  font-size: 13px;
  line-height: 18px;
`;
const ExtraAdressInput = styled.input`
  all: unset;
  width: 100%;
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 15px 0;
  border: none;
  color: white;
  background-color: #abd4ff;
  font-size: 16px;

  &.activeOn {
    background-color: ${props => props.theme.SignitureColor};
  }
`;
export default Order;
