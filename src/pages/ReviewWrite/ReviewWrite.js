import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { commonLayOut, flexSet } from '../../styles/mixin';
import { API } from '../../config';
import Footer from '../../components/Footer/Footer';
import BottomNav from '../../components/BottomNav/BottomNav';
import { useHistory } from 'react-router-dom';

const ReviewWrite = props => {
  const [reviewItem, setReviewItem] = useState([]);
  const [content, setContent] = useState('');
  const [star, setStar] = useState();
  const [reviewfiles, setReviewFiles] = useState([]);
  const productId = props.location.state.productId;
  const history = useHistory();

  useEffect(() => {
    fetch(`${API}/products/${productId}`)
      .then(res => res.json())
      .then(res => {
        setReviewItem(res.result.Detail_info);
      });
  }, []);

  const changeRating = (newRating, name) => {
    setStar(newRating);
  };

  const handleChange = e => {
    const { value } = e.target;

    setContent(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const obj = {
      product: productId,
      content,
      rating: star,
      filename: reviewfiles,
    };

    const formData = new FormData();
    Object.entries(obj).forEach(([k, v]) => formData.append(k, v));

    const authToken = localStorage.getItem('Token');
    axios({
      method: 'post',
      url: `${API}/reviews`,
      data: formData,
      headers: {
        Authorization: authToken,
      },
    })
      .then(res => {
        alert('리뷰가 등록되었습니다');
        history.push(`/review/${productId}`);
      })
      .catch(err => {
        alert(err);
      });
  };

  const fileChangeHandler = e => {
    const { files } = e.target;

    const file = files[0];
    setReviewFiles(file);
  };

  return (
    <ReviewWrapper>
      <ReviewForm onSubmit={handleSubmit} encType="multipart/form-data">
        <RatingWrapper>
          <div>
            <ProductImage alt="product" src={reviewItem.product_image} />
          </div>
          <div>
            <ProductTitle>{reviewItem.product_name}</ProductTitle>
            <StarRatings
              rating={star}
              starRatedColor="red"
              starDimension="30px"
              starSpacing="1px"
              changeRating={changeRating}
              numberOfStars={5}
              name="rating"
            />
          </div>
        </RatingWrapper>
        <DivideLine />
        <ContentWrapper>
          <Title>상세리뷰</Title>
          <TextArea
            value={content}
            onChange={handleChange}
            placeholder="솔직한 리뷰를 남겨주세요"
          />
        </ContentWrapper>
        <DivideLine />
        <FileWrapper>
          <Title>사진첨부</Title>
          <Label htmlFor="input-file">파일 업로드</Label>
          <FileInput
            type="file"
            id="input-file"
            onChange={fileChangeHandler}
            accept=".png, .jpg, .jpeg"
          />
        </FileWrapper>
        <DivideLine />
        <SubmitWrapper>
          <Submitbutton type="submit" />
        </SubmitWrapper>
      </ReviewForm>
      <Footer />
      <BottomNav />
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.section`
  ${commonLayOut}
  margin: 20px auto;
  ${flexSet('column', 'flex-start')}
`;

const ReviewForm = styled.form`
  ${flexSet('column')}
`;

const DivideLine = styled.div`
  width: 100%;
  margin: 20px 0;
  border-bottom: 1px solid ${props => props.theme.LightGray};
`;

const Title = styled.span`
  padding-right: 20px;
  font-weight: 700;
`;

const RatingWrapper = styled.section`
  ${flexSet('row', 'center', 'center')}

  > div {
    ${flexSet('column', 'center', 'flex-start')}
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  padding-right: 20px;
`;

const ProductTitle = styled.span`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 700;
`;

const ContentWrapper = styled.section`
  ${flexSet('row', 'space-between', 'flex-start')}
`;

const TextArea = styled.textarea`
  all: unset;
  width: 350px;
  height: 200px;
  border: 1px solid ${props => props.theme.LightGray};
  padding: 7px;
`;

const Label = styled.label`
  padding: 4px 20px;
  border: 1px solid ${props => props.theme.SignitureColor};
  border-radius: 3px;
  color: ${props => props.theme.SignitureColor};
  cursor: pointer;
`;

const Input = styled.input.attrs(props => ({
  type: 'text',
}))`
  all: unset;
`;

const FileInput = styled(Input).attrs({
  type: 'file',
})`
  display: none;
`;

const SubmitWrapper = styled.section`
  width: 100%;
  ${flexSet('row', 'center', 'center')};
`;

const Submitbutton = styled(Input).attrs({
  type: 'submit',
})`
  padding: 7px 30px;
  margin: 20px 0;
  border: 1px solid ${props => props.theme.SignitureColor};
  border-radius: 3px;
  background-color: ${props => props.theme.SignitureColor};
  color: white;
  cursor: pointer;
`;

const FileWrapper = styled.section`
  > p {
    display: inline;
    margin-left: 10px;
  }
`;

export default ReviewWrite;
