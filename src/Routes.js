import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
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
import Order from './pages/Order/Order';
import ReviewWrite from './pages/ReviewWrite/ReviewWrite';

const Routes = () => (
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
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
          <Route exact path="/order" component={Order} />
          <Route exact path="/*" component={Main} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default Routes;
