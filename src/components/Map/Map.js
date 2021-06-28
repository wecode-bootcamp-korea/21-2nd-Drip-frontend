/*global kakao*/

import { useEffect } from 'react';

const Map = props => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(
        37.365264512305174,
        127.10676860117488
      ),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(props.address, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
  }, []);

  return (
    <div>
      <div id="map" style={{ width: '100vw', height: '300px' }}></div>
    </div>
  );
};

export default Map;
