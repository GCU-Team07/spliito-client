import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import RecentGroup from './RecentGroup'; 
import GroupCreation from './GroupCreation';
import GroupDetails from './GroupDetails';
function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/recentgroup" element={<RecentGroup />} />
        <Route path="/groupcreation" element={<GroupCreation />} />
        <Route path="/group:{groupID}" element={<GroupDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
