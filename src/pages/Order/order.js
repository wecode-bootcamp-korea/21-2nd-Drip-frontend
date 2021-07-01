import React, { useState, useEffect } from 'react';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import Footer from '../../components/Footer/Footer';
import styled from 'styled-components';
import { flexSet, commonLayOut } from '../../styles/mixin';
import { useHistory } from 'react-router-dom';
import { ORDER_API } from '../../config';

const Order = productId => {
  const [itemData, setItemData] = useState([]);
  const [fullAddress, setFullAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [postCode, setPostCode] = useState('');
  const [seletedDate, setSelectedDate] = useState('');
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [personnelCount, setPersonnelCount] = useState(1);
  const history = useHistory();

  useEffect(() => {
    fetch(`${ORDER_API}/products/${productId}`)
      .then(res => res.json())
      .then(res => setItemData(res));
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
        `${seletedDate} ${personnelCount}명 참여 신청하시겠습니까?`
      ) === true
    ) {
      fetch(`${ORDER_API}/orders`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('Token'),
        },
        body: JSON.stringify({
          product_id: productId,
          status: 2,
        }),
      });

      history.push('/mypage');
    } else {
      alert('예약이 취소되었습니다.');
    }
  };

  return (
    <OrderWrap>
      <HeaderSearch />
      <ContentsWrap>
        <Title>참여신청</Title>
        <ItemInformation>
          <ItemImage
            alt="Item Thumbnail"
            src="/images/mainCard/thumbnail.png"
          />
          <ItemDetailWrap>
            <ItemName>상품이름입니다아아아아아아아아아아아아아아ㅏㅇ!</ItemName>
            <PriceWrap>
              35,000원 <ListPrice>80,000</ListPrice>
            </PriceWrap>
          </ItemDetailWrap>
        </ItemInformation>
        <SelectOrderForm>
          <OrderDateWrap>
            <SelectTitle>참여 날짜</SelectTitle>
            <select onChange={event => selectDate(event)}>
              <option value="">날짜를 선택해 주세요.</option>
              <option value="7월 10일(토)">7월 10일(토)</option>
              <option value="7월 11일(일)">7월 11일(일)</option>
              <option value="7월 17일(토)">7월 17일(토)</option>
              <option value="7월 18일(일)">7월 18일(일)</option>
            </select>
          </OrderDateWrap>
          <PersonnelWrap>
            <SelectTitle>참여 인원</SelectTitle>
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
              참여자 주소<Notice>*참여자 대표 주소 작성</Notice>
            </SelectTitle>
            <PostSearchWrap>
              <PostCodeInput>{postCode}</PostCodeInput>
              <PostCodeSearchButton onClick={findPostCode}>
                우편번호 찾기
              </PostCodeSearchButton>
            </PostSearchWrap>
            <AdressInput>{fullAddress}</AdressInput>
            <AdressInput>
              <ExtraAdressInput
                onChange={event => getDatailAddress(event)}
                value={detailAddress}
                placeholder="상세 주소를 입력해 주세요."
              />
            </AdressInput>
          </AddressWrap>
        </SelectOrderForm>
        <OrderButton
          disabled={!isFormFilled}
          className={isFormFilled && 'activeOn'}
          onClick={joinItem}
        >
          신청하기
        </OrderButton>
      </ContentsWrap>
      <Footer />
    </OrderWrap>
  );
};

const OrderWrap = styled.section`
  ${commonLayOut}
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
