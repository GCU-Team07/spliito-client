import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // 초기 그룹 데이터 설정 (더미 데이터)
  const [groups, setGroups] = useState([
    { groupId: 1, location: '부산', date: '2024/10/20' },
    { groupId: 2, location: '대전', date: '2024/10/21' },
    { groupId: 3, location: '서울', date: '2024/10/22' }
  ]);

  // 컴포넌트가 마운트될 때 최근 그룹 목록을 가져오기 위한 API 호출
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/group/all');
        setGroups(response.data || []); // API에서 데이터를 가져올 수 있으면 사용
      } catch (error) {
        console.error("최근 그룹 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchGroups();
  }, []);

  // 화살표 버튼 클릭 시 최근 그룹 페이지로 이동
  const handleArrowClick = () => {
    navigate('/recentgroup'); // 최근 그룹 페이지로 이동
  };

  // 시작하기 버튼 클릭 시 그룹 생성 페이지로 이동
  const handleStartClick = () => {
    navigate('/groupCreatePage'); // 그룹 생성 페이지로 이동
  };

  // 특정 그룹의 세부 페이지로 이동
  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="home-container">
      <h1>Splitway</h1>
      <p>비용을 간단하게 나누는 스마트한 방법, <br />Splitway로 빠르게 정산하세요.</p>

      {/* 프로필 이미지 표시 영역 */}
      <div className="profile-circle" ref={profileRef}>
        <img src={`${process.env.PUBLIC_URL}/splitway.png`} alt="프로필 이미지" />
      </div>

      {/* 시작하기 버튼 */}
      <button className="start-button" onClick={handleStartClick}>시작하기</button>

      {/* 최근 그룹 섹션 */}
      <div className="recent-groups-section">
        <div className="recent-groups-header">
          <h2>최근 그룹</h2>
          <button className="arrow-button" onClick={handleArrowClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="19" viewBox="0 0 10 19" fill="none">
              <path d="M9.57812 9.84131L1.76482 17.6546C1.43996 17.9795 0.913258 17.9795 0.588397 17.6546C0.263537 17.3298 0.263537 16.803 0.588397 16.4782L8.4017 8.66488L9.57812 9.84131Z" fill="black"/>
              <rect x="8.82373" y="10.7565" width="12.4779" height="1.66372" rx="0.831858" transform="rotate(-135 8.82373 10.7565)" fill="black"/>
            </svg>
          </button>
        </div>
        
        {/* 동적으로 최근 그룹 목록 표시 */}
        <div className="recent-groups-list">
          {groups.length > 0 ? (
            groups.map((group) => (
              <button
                key={group.groupId}
                className="recent-group-item"
                onClick={() => handleGroupClick(group.groupId)}
              >
                <span>{group.location}</span>
                <span>{group.date}</span>
              </button>
            ))
          ) : (
            <p>최근 그룹이 없습니다.</p> // 그룹이 없을 경우 표시할 메시지
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
