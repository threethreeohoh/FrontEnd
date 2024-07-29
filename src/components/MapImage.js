import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import './MapImage.css';
import { Map, MapMarker, MapTypeControl, ZoomControl, Polyline } from 'react-kakao-maps-sdk';
import dataUri from './dataUri';

const center = {
  lat: 33.392197,
  lng: 126.560781,
};

const positions = [
  { title: "외도", latlng: { lat: 33.4769, lng: 126.4317 }, namecode: 864 },
  { title: "대정", latlng: { lat: 33.241, lng: 126.2263 }, namecode: 793 },
  { title: "중문", latlng: { lat: 33.2494, lng: 126.406 }, namecode: 328 },
  { title: "제주남원", latlng: { lat: 33.2772, lng: 126.7044 }, namecode: 780 },
  { title: "대흘", latlng: { lat: 33.5008, lng: 126.6495 }, namecode: 330 },
  { title: "구좌", latlng: { lat: 33.5199, lng: 126.8777 }, namecode: 781 },
  { title: "진달래밭", latlng: { lat: 33.3698, lng: 126.5557 }, namecode: 870 },
  { title: "영실", latlng: { lat: 33.3483, lng: 126.4964 }, namecode: 869 },
  { title: "서광", latlng: { lat: 33.3046, lng: 126.306 }, namecode: 752 },
  { title: "새별오름", latlng: { lat: 33.3623, lng: 126.3599 }, namecode: 883 },
  { title: "어리목", latlng: { lat: 33.393, lng: 126.4959 }, namecode: 753 },
  { title: "월정", latlng: { lat: 33.5623, lng: 126.7781 }, namecode: 861 },
  { title: "제주가시리", latlng: { lat: 33.3854, lng: 126.7336 }, namecode: 890 },
  { title: "애월", latlng: { lat: 33.4659, lng: 126.3275 }, namecode: 893 },
  { title: "마라도", latlng: { lat: 33.1221, lng: 126.2679 }, namecode: 726 },
];

export default function AddMapClickEventWithMarker({ setObservatoryOrder, setDistances, setApiError }) {
  const [position, setPosition] = useState(center);
  const [distances, setDistancesLocal] = useState([]);
  const [localApiError, setLocalApiError] = useState(false); // 로컬 상태로 apiError 추가

  useEffect(() => {
    const checkApi = async () => {
      try {
        if (!window.kakao || !window.kakao.maps) {
          throw new Error('Kakao Maps API failed to load');
        }
        calculateDistances(center);
      } catch (error) {
        console.error('Kakao API Error:', error);
        setLocalApiError(true);
        setApiError(error); // 부모 컴포넌트로 오류 전달
      }
    };

    checkApi();
  }, [setApiError]);

  const calculateDistances = (clickedPosition) => {
    const newDistances = positions.map(pos => {
      const path = [
        new window.kakao.maps.LatLng(clickedPosition.lat, clickedPosition.lng),
        new window.kakao.maps.LatLng(pos.latlng.lat, pos.latlng.lng)
      ];
      const polyline = new window.kakao.maps.Polyline({ path });
      const distance = Math.round(polyline.getLength());
      polyline.setMap(null);
      return { title: pos.title, distance, latlng: pos.latlng, namecode: pos.namecode };
    });

    newDistances.sort((a, b) => a.distance - b.distance);
    console.log("Calculated Distances:", newDistances); // 추가된 로그
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

  if (localApiError) {
    return <Navigate to="/apierror" />; // 로딩 실패 시 오류 페이지로 리디렉션
  }

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
