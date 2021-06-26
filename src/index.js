import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

window.Kakao.init(process.env.REACT_APP_KAKAO_API);
window.Kakao.isInitialized();
ReactDOM.render(<Routes />, document.getElementById('root'));
