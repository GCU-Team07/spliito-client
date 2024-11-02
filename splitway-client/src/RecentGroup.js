// RecentGroup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecentGroup.css';

function RecentGroup({ groups, onDeleteGroup }) {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);

  // 그룹 멤버 표시 형식, members가 없을 경우 빈 배열로 설정
  const formatMembers = (members = []) => {
    if (members.length <= 2) {
      return members.join(', ');
    } else {
      return `${members.slice(0, 2).join(', ')} 외 ${members.length - 2}명`;
    }
  };

  // 그룹 항목 클릭 시 상세 페이지로 이동 (편집 모드가 아닐 경우에만 이동)
  const handleGroupClick = (groupId) => {
    if (!isEditMode) {
      navigate(`/group/${groupId}`);
    }
  };

  // 편집 모드 토글
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // 삭제 확인 함수
  const confirmDelete = (groupId) => {
    const isConfirmed = window.confirm("삭제하시겠습니까?");
    if (isConfirmed) {
      onDeleteGroup(groupId);
    }
  };

  return (
    <div className="custom-recent-groups-section">
      <div className="custom-recent-groups-header">
        {/* 홈으로 돌아가는 화살표 버튼 */}
        <button className="custom-arrow-button" onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="22" viewBox="0 0 13 22" fill="none">
            <path d="M0.506836 10.0997L9.89943 0.707134C10.29 0.31661 10.9231 0.316609 11.3136 0.707134C11.7042 1.09766 11.7042 1.73082 11.3136 2.12135L1.92105 11.5139L0.506836 10.0997Z" fill="black"/>
            <rect x="1.41406" y="8.99988" width="15" height="2" rx="1" transform="rotate(45 1.41406 8.99988)" fill="black"/>
          </svg>
        </button>
        
        {/* Recent Group 제목 */}
        <h2 className="custom-recent-groups-title">Recent Group</h2>
        
        {/* 편집 모드 토글 버튼 */}
        <button className="edit-button" onClick={toggleEditMode}>
          <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M3 21v-4.586L17.707 1.707a1 1 0 0 1 1.415 0l2.17 2.17a1 1 0 0 1 0 1.415L7.586 21H3zm2-3.414v1.414h1.414L17.99 8.414l-1.414-1.414L5 17.586zM20.707 4.707l-1.414 1.414-2.17-2.17 1.414-1.414 2.17 2.17z"/>
          </svg>
        </button>
      </div>

      {/* 그룹 항목 목록 */}
      {groups.map((group, index) => (
        <div 
          key={index} 
          className="custom-recent-group-item"
          onClick={() => handleGroupClick(group.groupId)}
          style={{ cursor: isEditMode ? 'default' : 'pointer' }}
        >
          <div className="custom-group-detail">
            {/* 그룹 위치 */}
            <span className="custom-location">{group.location}</span>
            
            {/* 날짜와 멤버 정보를 각각 한 줄씩 표시 */}
            <div className="custom-group-info">
              <label>{group.date}</label>
              <label>{formatMembers(group.members)}</label>
            </div>
            
            {/* 삭제 버튼 (편집 모드일 때만 표시) */}
            {isEditMode && (
              <button 
                onClick={() => confirmDelete(group.groupId)} 
                className="delete-button"
              >
                <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M1 1l14 14M15 1L1 15" stroke="black" strokeWidth="2"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentGroup;
