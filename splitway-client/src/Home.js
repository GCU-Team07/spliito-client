import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Initial dummy data for groups
  const [groups, setGroups] = useState([
    { groupId: 1, location: '부산', date: '2024/10/20' },
    { groupId: 2, location: '대전', date: '2024/10/21' },
    { groupId: 3, location: '서울', date: '2024/10/22' }
  ]);

  // Fetch recent groups when component mounts
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('/api/group/all');
        setGroups(response.data || []); // Use API response if available
      } catch (error) {
        console.error("Error fetching recent groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleArrowClick = () => {
    navigate('/recentgroup'); // Navigate to recent groups page
  };

  const handleStartClick = () => {
    navigate('/groupCreation'); // Navigate to group creation page
  };

  // Navigate to group details page for a specific group
  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="home-container">
      <h1>Splitway</h1>
      <p>비용을 간단하게 나누는 스마트한 방법, <br />Splitway로 빠르게 정산하세요.</p>

      {/* Profile Circle */}
      <div className="profile-circle" ref={profileRef}>
        <img src="path-to-profile-image" alt="프로필 이미지" />
      </div>

      {/* Start Button */}
      <button className="start-button" onClick={handleStartClick}>시작하기</button>

      {/* Recent Groups Section */}
      <div className="recent-groups-section">
        <div className="recent-groups-header">
          <h2>Recent Groups</h2>
          <button className="arrow-button" onClick={handleArrowClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="19" viewBox="0 0 10 19" fill="none">
              <path d="M9.57812 9.84131L1.76482 17.6546C1.43996 17.9795 0.913258 17.9795 0.588397 17.6546C0.263537 17.3298 0.263537 16.803 0.588397 16.4782L8.4017 8.66488L9.57812 9.84131Z" fill="black"/>
              <rect x="8.82373" y="10.7565" width="12.4779" height="1.66372" rx="0.831858" transform="rotate(-135 8.82373 10.7565)" fill="black"/>
            </svg>
          </button>
        </div>
        
        {/* Display recent groups dynamically */}
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
            <p>No recent groups available.</p> // Display a message if no groups are available
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
