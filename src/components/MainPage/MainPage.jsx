import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

const MainPage = () => {
  const [randomRestaurants, setRandomRestaurants] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [category, setCategory] = useState('restaurants'); // 기본값: 음식점
  const navigate = useNavigate();

  // API로부터 받아올 데이터 상태
  const [places, setPlaces] = useState({
    restaurants: [],
    cafes: [],
  });

  // 현재 선택된 카테고리 데이터 가져오기
  const currentPlaces = places[category];

  // Flask API에서 데이터 가져오기
  const fetchPlacesFromAPI = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/ranking'); // Flask API URL
      if (!response.ok) throw new Error('API 요청 실패');
      const data = await response.json();
      setPlaces({
        restaurants: data.restaurant_ranking,
        cafes: data.cafe_ranking,
      });
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }
  }, []);

  // 현재 시간 업데이트 함수
  const updateCurrentTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const formattedHours = hours.toString().padStart(2, '0');
    setCurrentTime(`${formattedHours}:00`);
  }, []);

  // 랜덤 추천 식당 업데이트
  useEffect(() => {
    if (places.restaurants.length > 0) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * places.restaurants.length);
        setRandomRestaurants(places.restaurants[randomIndex].shop_name);
      }, 3000); // 3초마다 변경
      return () => clearInterval(interval);
    }
  }, [places.restaurants]);

  // Flask API 데이터 및 시간 업데이트
  useEffect(() => {
    fetchPlacesFromAPI();
    updateCurrentTime();

    // 1분마다 데이터 및 시간 업데이트
    const interval = setInterval(() => {
      fetchPlacesFromAPI();
      updateCurrentTime();
    }, 60000); // 1분 간격
    return () => clearInterval(interval);
  }, [fetchPlacesFromAPI, updateCurrentTime]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleRestaurantClick = (restaurantName) => {
    console.log(`${restaurantName} 클릭됨 - 상세 페이지로 이동 예정`);
    // 상세 페이지 이동 로직 추가 가능
  };

  useEffect(() => {
    const loadKakaoMap = () => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.556229, 126.937079),
        level: 3
      };

      // 지도 객체 생성
      const map = new window.kakao.maps.Map(container, options);
      
      // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
      const mapTypeControl = new window.kakao.maps.MapTypeControl();
      map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

      // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
      const zoomControl = new window.kakao.maps.ZoomControl();
      map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

      // 마커 생성
      const markerPosition = new window.kakao.maps.LatLng(37.556229, 126.937079);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });

      // 마커를 지도에 표시
      marker.setMap(map);

      // InfoWindow 생성
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            background-color: white;
            font-family: 'Pretendard', sans-serif;
          ">
            <h4 style="margin: 0; font-size: 16px; color: #333;">커피빈 신촌점</h4>
            <p style="margin: 5px 0 0; font-size: 14px; color: #666;">평점: 5.0</p>
          </div>
        `,
        removable: true
      });

      // 마커에 마우스 오버 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
        infoWindow.open(map, marker);
      });

      // 마커에 마우스 아웃 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
        infoWindow.close();
      });

      // 버티고 빌딩 영역 좌표
      const buildingPath = [
        new window.kakao.maps.LatLng(37.556329, 126.936979),
        new window.kakao.maps.LatLng(37.556329, 126.937179),
        new window.kakao.maps.LatLng(37.556129, 126.937179),
        new window.kakao.maps.LatLng(37.556129, 126.936979)
      ];

      // 건물 영역 폴리곤 생성
      const building = new window.kakao.maps.Polygon({
        path: buildingPath,
        strokeWeight: 2,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#FFB6C1',  // 연한 빨간색
        fillOpacity: 0.5
      });

      // 건물 폴리곤을 지도에 표시
      building.setMap(map);

      // 500m 범위 원 생성
      const circle = new window.kakao.maps.Circle({
        center: markerPosition, // 원의 중심좌표
        radius: 500, // 미터 단위의 반지름
        strokeWeight: 2, // 선의 두께
        strokeColor: '#87CEEB', // 선의 색깔
        strokeOpacity: 0.8, // 선의 불투명도
        strokeStyle: 'solid', // 선의 스타일
        fillColor: '#87CEEB', // 채우기 색깔
        fillOpacity: 0.2 // 채우기 불투명도
      });

      // 원을 지도에 표시
      circle.setMap(map);

      // 새로운 마커 생성 (신촌 현백)
      const markerPosition2 = new window.kakao.maps.LatLng(37.556042, 126.935807);
      const marker2 = new window.kakao.maps.Marker({
        position: markerPosition2
      });
      marker2.setMap(map);

      // 새로운 마커 생성 (추가된 위치)
      const markerPosition3 = new window.kakao.maps.LatLng(37.556467, 126.937160);
      const marker3 = new window.kakao.maps.Marker({
        position: markerPosition3
      });
      marker3.setMap(map);

      // 새로운 건물 영역 좌표
      const buildingPath2 = [
        new window.kakao.maps.LatLng(37.556567, 126.937060),
        new window.kakao.maps.LatLng(37.556567, 126.937260),
        new window.kakao.maps.LatLng(37.556367, 126.937260),
        new window.kakao.maps.LatLng(37.556367, 126.937060)
      ];

      // 새로운 건물 영역 폴리곤 생성
      const building2 = new window.kakao.maps.Polygon({
        path: buildingPath2,
        strokeWeight: 2,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeStyle: 'solid',
        fillColor: '#FFB6C1',  // 연한 빨간색
        fillOpacity: 0.5
      });

      // 건물 폴리곤을 지도에 표시
      building2.setMap(map);
    };

    // 카카오맵 SDK가 로드된 후 실행
    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    }
  }, []);

  // 로그인 버튼 클릭 핸들러 추가
  const handleLoginClick = () => {
    navigate('/login'); // '/login' 경로로 이동
  };

  // 홈으로 이동하는 핸들러 추가
  const handleHomeClick = () => {
    window.location.href = '/'; // 또는 React Router 사용 시: navigate('/')
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-text" onClick={() => (window.location.href = '/')}>
            SpotRank
          </span>
        </div>
        <div className="nav-buttons">
          <button className="login-button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </header>

      <div className="main-content">
        <div className="left-panels">
          <div className="panel hot-places-panel">
            <div className="category-toggle">
              <button
                className={`toggle-button ${category === 'restaurants' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('restaurants')}
              >
                음식점
              </button>
              <span className="divider">|</span>
              <button
                className={`toggle-button ${category === 'cafes' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('cafes')}
              >
                카페
              </button>
            </div>

            <div className="hot-places">
              <h2>핫플레이스 <span>({currentTime} 판매량 기준)</span></h2>
              <ul>
                {currentPlaces.map((place) => (
                  <li
                    key={place.shop_name}
                    onClick={() => handleRestaurantClick(place.shop_name)}
                    className="restaurant-item"
                  >
                    {place.rank}. {place.shop_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="panel recommendation-panel">
            <div className="recommendation">
              <h2>오늘 뭐 먹지?</h2>
              <div className="random-restaurants">
                {randomRestaurants || '로딩 중...'}
              </div>
            </div>
          </div>
        </div>

        <div id="map" className="map-container"></div>
      </div>
    </div>
  );
};

export default MainPage;