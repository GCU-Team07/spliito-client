// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import RecentGroup from './RecentGroup';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

function App() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // 초기 데이터를 위해 MockAdapter 설정 (members 배열 포함)
    const mock = new MockAdapter(axios);
    mock.onGet('/api/group/all').reply(200, [
      { groupId: 1, location: '부산', date: '2024/10/20', members: ['고구마', '감자', '옥수수', '양파'] },
      { groupId: 2, location: '대전', date: '2024/10/21', members: ['사과', '배', '귤'] },
      { groupId: 3, location: '서울', date: '2024/10/22', members: ['멜론', '수박'] },
    ]);

    mock.onDelete(/\/api\/group\/\d+/).reply((config) => {
      const groupId = parseInt(config.url.split('/').pop(), 10);
      setGroups((prevGroups) => prevGroups.filter((group) => group.groupId !== groupId));
      return [200];
    });

    // 초기 그룹 데이터 가져오기
    axios.get('/api/group/all')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error("그룹 데이터 로딩 오류:", error);
      });
  }, []);

  // deleteGroup 함수 정의하여 상태에서 그룹 제거
  const deleteGroup = (groupId) => {
    setGroups(prevGroups => prevGroups.filter(group => group.groupId !== groupId));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home groups={groups} />} />
        <Route 
          path="/recentgroup" 
          element={<RecentGroup groups={groups} onDeleteGroup={deleteGroup} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
