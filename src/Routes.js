import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Main from './pages/Main/Main';
import Activity from './pages/Activity/Activity';
import Bookmark from './pages/Bookmark/Bookmark';
import Detail from './pages/Detail/Detail';
import Learning from './pages/Learning/Learning';
import Login from './pages/Login/Login';
import MyPage from './pages/MyPage/MyPage';
import Register from './pages/Register/Register';
import Review from './pages/Review/Review';
import Search from './pages/Search/Search';
// 컴포넌트 테스트용 임포트
import BottomNav from './components/BottomNav/BottomNav';
import HeaderNav from './components/HeaderNav/HeaderNav';
import MainCard from './components/MainCard/MainCard';
import Modal from './components/Modal/Modal';
import ReviewCard from './components/ReviewCard/ReviewCard';
import SearchResult from './components/SearchResult/SearchResult';
import theme from './styles/theme';
import ReviewWrite from './pages/ReviewWrite/ReviewWrite';

const Routes = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {/* 메인 페이지 */}
          <Route exact path="/main" component={Main} />
          <Route exact path="/activity" component={Activity} />
          <Route exact path="/bookmark" component={Bookmark} />
          <Route exact path="/detail/:productid" component={Detail} />
          <Route exact path="/learning" component={Learning} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/review/:id" component={Review} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/review-write" component={ReviewWrite} />
          {/* <Route exact path="/search" component={Search} /> */}
          {/* 컴포넌트 테스트용 */}
          <Route exact path="/bottomnav" component={BottomNav} />
          <Route exact path="/headernav" component={HeaderNav} />
          <Route exact path="/maincard" component={MainCard} />
          <Route exact path="/modal" component={Modal} />
          <Route exact path="/reviewcard" component={ReviewCard} />
          <Route exact path="/searchResult" component={SearchResult} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default Routes;
