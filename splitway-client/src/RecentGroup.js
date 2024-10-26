import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecentGroup.css';

function RecentGroup() {
  const navigate = useNavigate();

  // Initial dummy data for groups
  const [groups, setGroups] = useState([
    {
      groupId: 1, // Unique ID for navigation
      location: '부산',
      date: '2024/10/20',
      members: ['고구마', '감자', '옥수수', '양파']
    },
    {
      groupId: 2,
      location: '대전',
      date: '2024/10/21',
      members: ['사과', '배', '귤']
    },
    {
      groupId: 3,
      location: '서울',
      date: '2024/10/22',
      members: ['멜론', '수박']
    }
  ]);

  useEffect(() => {
    // Fetch recent groups when component mounts
    axios.get('/api/group/all')
      .then(response => {
        setGroups(response.data); // Assuming response.data is an array of group objects
      })
      .catch(error => {
        console.error("Error fetching recent groups:", error);
        // If there's an error, keep the dummy data
      });
  }, []);

  // Function to format members display
  const formatMembers = (members) => {
    if (members.length <= 2) {
      return members.join(', ');
    } else {
      return `${members.slice(0, 2).join(', ')} 외 ${members.length - 2}명`;
    }
  };

  // Navigate to group details page for the selected group
  const handleGroupClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  return (
    <div className="recent-groups-sections">
      <div className="recent-groups-header">
        <button className="arrow-button" onClick={() => navigate('/')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="22" viewBox="0 0 13 22" fill="none">
            <path d="M0.506836 10.0997L9.89943 0.707134C10.29 0.31661 10.9231 0.316609 11.3136 0.707134C11.7042 1.09766 11.7042 1.73082 11.3136 2.12135L1.92105 11.5139L0.506836 10.0997Z" fill="black"/>
            <rect x="1.41406" y="8.99988" width="15" height="2" rx="1" transform="rotate(45 1.41406 8.99988)" fill="black"/>
          </svg>
        </button>
        <h2 className="recent-groups-titles">Recent Groups</h2>
      </div>

      {groups.map((group, index) => (
        <div 
          key={index} 
          className="recent-group-items"
          onClick={() => handleGroupClick(group.groupId)} // Navigate on click
          style={{ cursor: 'pointer' }} // Indicate clickable
        >
          <div className="group-details">
            <span className="location">{group.location}</span>
            <div className="checkbox-group">
              <label>
                {group.date}
              </label>
              <label>
                {formatMembers(group.members)}
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentGroup;
