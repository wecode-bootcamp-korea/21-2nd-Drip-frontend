import { API } from '../../config';

const kakaoLogin = history => {
  window.Kakao.Auth.login({
    success: res => {
      const authToken = res.access_token;

      window.Kakao.API.request({
        url: '/v2/user/me',
        data: {
          property_keys: [
            'properties.nickname',
            'properties.profile_image',
            'kakao_account.email',
          ],
        },
        success: res => {
          fetch(`${API}/users/signin`, {
            method: 'POST',
            headers: {
              Authorization: authToken,
            },
            body: JSON.stringify({
              name: res.properties.nickname,
              profile_image: res.properties.profile_image,
              email: res.kakao_account.email,
            }),
          })
            .then(res => res.json())
            .then(res => {
              if (res.token) {
                localStorage.setItem('Token', res.token);
                alert('로그인 되었습니다.');
                history.push('/');
              } else {
                alert('다시 확인해 주세요.');
              }
            });
        },
      });
    },
    fail: function (err) {
      console.log('에러', err);
    },
  });
};

export default kakaoLogin;
