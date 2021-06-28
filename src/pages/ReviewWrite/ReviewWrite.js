import React, { useState } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { flexSet } from '../../styles/mixin';
import { API } from '../../config';

const ReviewWrite = () => {
  const [content, setContent] = useState('');
  const [star, setStar] = useState();
  const [reviewfiles, setReviewFiles] = useState([]);

  const changeRating = (newRating, name) => {
    setStar(newRating);
  };

  const handleChange = e => {
    const { value } = e.target;

    setContent(value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const authToken = localStorage.getItem('Token');

    fetch(`${API}/reviews`, {
      method: 'POST',
      header: {
        Authorization: authToken,
      },
      body: {
        rating: star,
        content,
        reviewfiles,
      },
    })
      .then(res => res.json())
      // 아직 테스트 로그를 찍어봐야함
      .then(res => console.log(res));
  };

  const fileChangeHandler = e => {
    const { files } = e.target;

    files.length > 10
      ? alert('10개를 초과한 파일을 업로드할수 없습니다')
      : setReviewFiles(files);
  };

  return (
    <ReviewWrapper>
      <ReviewForm onSubmit={handleSubmit}>
        <RatingWrapper>
          <div>
            <ProductImage />
          </div>
          <div>
            <ProductTitle>test</ProductTitle>
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
            multiple
          />
          <p>{`선택된 파일수: ${reviewfiles.length} / 10`}</p>
        </FileWrapper>
        <DivideLine />
        <SubmitWrapper>
          <Submitbutton type="submit" />
        </SubmitWrapper>
      </ReviewForm>
    </ReviewWrapper>
  );
};

const ReviewWrapper = styled.section`
  width: 440px;
  margin: 20px auto;
  ${flexSet('row', 'flex-start')}
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
  padding: 6px 30px;
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
