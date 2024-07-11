import React, { useState } from 'react';
import './MapImage.css';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';

const center = {
  // 지도의 중심좌표
  lat: 33.392197,
  lng: 126.560781,
};

export default function AddMapClickEventWithMarker() {
  const [position, setPosition] = useState(undefined);

  return (
    <>
      <Map // 지도를 표시할 Container
        id="map"
        center={center}
        style={{
          width: "97%",
          height: "600px",
        }}
        level={10} // 지도의 확대 레벨
        onClick={(_target, mouseEvent) => {
          const latlng = mouseEvent.latLng;
          setPosition({
            lat: latlng.getLat(),
            lng: latlng.getLng(),
          });
        }}
      >
        <MapMarker position={position ?? center} />
        <MapMarker // 마커를 생성합니다
        position={{
          // 마커가 표시될 위치입니다
          lat: 33.450701,
          lng: 126.570667,
        }}
      />
        <MapTypeControl position="TOPRIGHT" />
        <ZoomControl position="RIGHT" />
      </Map>
    </>
  );
}
