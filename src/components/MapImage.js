import React, { useState } from 'react';
import './MapImage.css';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import dataUri from './dataUri';

const center = {
  // 지도의 중심좌표
  lat: 33.392197,
  lng: 126.560781,
};

const positions = [
  {
    title: "외도",
    latlng: { lat: 33.4769, lng: 126.4317 },
  },
  {
    title: "대정",
    latlng: { lat: 33.241, lng: 126.2263 },
  },
  {
    title: "중문",
    latlng: { lat: 33.2494, lng: 126.406 },
  },
  {
    title: "제주남원",
    latlng: { lat: 33.2772, lng: 126.7044 },
  },
  {
    title: "대흘",
    latlng: { lat: 33.5008, lng: 126.6495 },
  },
  {
    title: "구좌",
    latlng: { lat: 33.5199, lng: 126.8777 },
  },
  {
    title: "진달래밭",
    latlng: { lat: 33.3698, lng: 126.5557 },
  },
  {
    title: "영실",
    latlng: { lat: 33.3483, lng: 126.4964 },
  },
  {
    title: "서광",
    latlng: { lat: 33.3046, lng: 126.306 },
  },
  {
    title: "새별오름",
    latlng: { lat: 33.3623, lng: 126.3599 },
  },
  {
    title: "어리목",
    latlng: { lat: 33.393, lng: 126.4959 },
  },
  {
    title: "월정",
    latlng: { lat: 33.5623, lng: 126.7781 },
  },
  {
    title: "제주가시리",
    latlng: { lat: 33.3854, lng: 126.7336 },
  },
  {
    title: "애월",
    latlng: { lat: 33.4659, lng: 126.3275 },
  },
]

export default function AddMapClickEventWithMarker() {
  const [position, setPosition] = useState(undefined);

  return (
    <>
    <h1 className="map-title"></h1>
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
        {positions.map((position, index) => (
        <MapMarker
          key={`${position.title}-${position.latlng}`}
          position={position.latlng} // 마커를 표시할 위치
          image={{
            src: dataUri,
            size: {
              width: 40,
              height: 40
            }, // 마커이미지의 크기입니다
          }}
          title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        />
      ))}
        <MapTypeControl position="TOPRIGHT" />
        <ZoomControl position="RIGHT" />
      </Map>
    </>
  );
}
