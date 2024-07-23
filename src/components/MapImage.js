import React, { useEffect, useState } from 'react';
import './MapImage.css';
import { Map, MapMarker, MapTypeControl, ZoomControl, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import dataUri from './dataUri';

const center = {
  lat: 33.392197,
  lng: 126.560781,
};

const positions = [
  { title: "외도", latlng: { lat: 33.4769, lng: 126.4317 } },
  { title: "대정", latlng: { lat: 33.241, lng: 126.2263 } },
  { title: "중문", latlng: { lat: 33.2494, lng: 126.406 } },
  { title: "제주남원", latlng: { lat: 33.2772, lng: 126.7044 } },
  { title: "대흘", latlng: { lat: 33.5008, lng: 126.6495 } },
  { title: "구좌", latlng: { lat: 33.5199, lng: 126.8777 } },
  { title: "진달래밭", latlng: { lat: 33.3698, lng: 126.5557 } },
  { title: "영실", latlng: { lat: 33.3483, lng: 126.4964 } },
  { title: "서광", latlng: { lat: 33.3046, lng: 126.306 } },
  { title: "새별오름", latlng: { lat: 33.3623, lng: 126.3599 } },
  { title: "어리목", latlng: { lat: 33.393, lng: 126.4959 } },
  { title: "월정", latlng: { lat: 33.5623, lng: 126.7781 } },
  { title: "제주가시리", latlng: { lat: 33.3854, lng: 126.7336 } },
  { title: "애월", latlng: { lat: 33.4659, lng: 126.3275 } },
  { title: "마라도", latlng: { lat: 33.1221, lng: 126.2679 } },
];

export default function AddMapClickEventWithMarker({ setObservatoryOrder, setDistances }) {
  const [position, setPosition] = useState(center);
  const [distances, setDistancesLocal] = useState([]);

  useEffect(() => {
    calculateDistances(center);
  }, []);

  const calculateDistances = (clickedPosition) => {
    const newDistances = positions.map(pos => {
      const path = [
        new window.kakao.maps.LatLng(clickedPosition.lat, clickedPosition.lng),
        new window.kakao.maps.LatLng(pos.latlng.lat, pos.latlng.lng)
      ];
      const polyline = new window.kakao.maps.Polyline({ path });
      const distance = Math.round(polyline.getLength());
      polyline.setMap(null);
      return { title: pos.title, distance, latlng: pos.latlng };
    });

    newDistances.sort((a, b) => a.distance - b.distance);
    setDistances(newDistances); // 부모 컴포넌트로 전달
    setDistancesLocal(newDistances); // 로컬 state 업데이트
    setObservatoryOrder(newDistances.map(d => d.title)); // 부모 컴포넌트로 순서 전달
  };

  const handleMapClick = (_target, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    const clickedPosition = {
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    };
    setPosition(clickedPosition);
    calculateDistances(clickedPosition);
  };

  return (
    <>
      <Map
        id="map"
        center={center}
        style={{ width: "97%", height: "600px" }}
        level={10}
        onClick={handleMapClick}
      >
        {position && (
          <MapMarker position={position} />
        )}
        {positions.map((position, index) => (
          <MapMarker
            key={`${position.title}-${position.latlng}`}
            position={position.latlng}
            image={{
              src: dataUri,
              size: { width: 40, height: 40 },
            }}
            title={position.title}
          />
        ))}
        <MapTypeControl position="TOPRIGHT" />
        <ZoomControl position="RIGHT" />
      </Map>
    </>
  );
}
