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

  const handleGroupClick = (groupId) => {
    if (!isEditMode) {
      navigate(`/group/${groupId}`);
    }
  };

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
        <button className="custom-arrow-button" onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="22" viewBox="0 0 13 22" fill="none">
            <path d="M0.506836 10.0997L9.89943 0.707134C10.29 0.31661 10.9231 0.316609 11.3136 0.707134C11.7042 1.09766 11.7042 1.73082 11.3136 2.12135L1.92105 11.5139L0.506836 10.0997Z" fill="black"/>
            <rect x="1.41406" y="8.99988" width="15" height="2" rx="1" transform="rotate(45 1.41406 8.99988)" fill="black"/>
          </svg>
        </button>
        <h2 className="custom-recent-groups-titles">Recent Group</h2>
        <button className="edit-button" onClick={toggleEditMode}>
          <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 0 .708l-12 12a.5.5 0 0 1-.168.11l-4 1a.5.5 0 0 1-.632-.632l1-4a.5.5 0 0 1 .11-.168l12-12a.5.5 0 0 1 .708 0zM13.5 1.5 3 12v1h1L14.5 2.5l-1-1zM2 13h1v1H2v-1zm1-1H2v-1h1v1zm10-10 1-1v1h-1z"/>
          </svg>
        </button>
      </div>

      {groups.map((group, index) => (
        <div 
          key={index} 
          className="custom-recent-group-item"
          onClick={() => handleGroupClick(group.groupId)}
          style={{ cursor: isEditMode ? 'default' : 'pointer' }}
        >
          <div className="custom-group-detail">
            <span className="custom-location">{group.location}</span>
            <div className="custom-checkbox-group">
              <label>{group.date}</label>
              <label>{formatMembers(group.members)}</label>
            </div>
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
