import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch';
import HeaderNav from '../../components/HeaderNav/HeaderNav';
import Footer from '../../components/Footer/Footer';
import MainCard from '../../components/MainCard/MainCard';
import styled from 'styled-components';
import { twoRowCardSet, commonLayOut } from '../../styles/mixin';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MAIN_API } from '../../config';

const settings = {
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Main = () => {
  const [hotDripArr, setHotDripArr] = useState([]);
  const [newDripArr, setNewDripArr] = useState([]);

  useEffect(() => {
    fetch(`${MAIN_API}/products?sortMethod=sellcount&reverse=True&limit=4`)
      .then(res => res.json())
      .then(res => {
        setHotDripArr(res.RESULT.products);
      });

    fetch(`${MAIN_API}/products?sortMethod=date&reverse=True&limit=4`)
      .then(res => res.json())
      .then(res => {
        setNewDripArr(res.RESULT.products);
      });
  }, []);

  return (
    <MainWrap>
      <HeaderSearch />
      <HeaderNav />
      <BigBanner>
        <StyledSlider {...settings}>
          <BannerImage alt="banner" src="/images/main/bigbanner-1.png" />
          <BannerImage alt="banner" src="/images/main/bigbanner-2.png" />
          <BannerImage alt="banner" src="/images/main/bigbanner-3.png" />
        </StyledSlider>
      </BigBanner>
      <List>
        <Title>지금 뜨는 드립 🚀</Title>
        <DripWrap>
          {hotDripArr.map(list => {
            return (
              <MainCard
                key={list.product_id}
                id={list.product_id}
                title={list.product_name}
                listPrice={parseInt(list.product_price).toLocaleString()}
                price={parseInt(
                  list.discount !== '1' && list.discount
                ).toLocaleString()}
                region={list.adress}
                isNew={list.new_tag}
                isHot={list.hot_tag}
                grade={list.avg_score}
                thumbnail={list.product_image}
                bookMarked={list.check}
              />
            );
          })}
        </DripWrap>
      </List>
      <List>
        <Title>신규 드립 🧡</Title>
        <DripWrap>
          {newDripArr.map(list => {
            return (
              <MainCard
                key={list.product_id}
                id={list.product_id}
                title={list.product_name}
                listPrice={parseInt(list.product_price).toLocaleString()}
                price={parseInt(
                  list.discount !== '1' && list.discount
                ).toLocaleString()}
                region={list.adress}
                isNew={list.new_tag}
                isHot={list.hot_tag}
                grade={list.avg_score}
                thumbnail={list.product_image}
                bookMarked={list.check}
              />
            );
          })}
        </DripWrap>
      </List>
      <Footer />
    </MainWrap>
  );
};

const MainWrap = styled.section`
  ${commonLayOut}
`;

const BigBanner = styled.article`
  position: relative;
  width: 485px;
  margin-bottom: 60px;
`;

const BannerImage = styled.img`
  width: 100%px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide img {
    outline: none;
  }
`;

const List = styled.div`
  margin-top: 20px;
  padding: 0 10px;
`;

const DripWrap = styled.div`
  ${twoRowCardSet}
`;

const Title = styled.div`
  margin: 30px 0;
  font-size: 20px;
  font-weight: bold;
`;

export default Main;
