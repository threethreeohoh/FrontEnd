import React from 'react';
import './MapImage.css';
import { Map } from 'react-kakao-maps-sdk';

const MapImage = () => {
    return (
      <div className="map-image">
        <h1>제주도 지도</h1>
        <Map 
        center={{ lat: 33.3563, lng: 126.49581 }}   // 지도의 중심 좌표
        style={{ width: '100%', height: '600px' }} // 지도 크기
        level={10}                                   // 지도 확대 레벨
      >
      </Map>
      </div>
    );
  };

  export default MapImage;