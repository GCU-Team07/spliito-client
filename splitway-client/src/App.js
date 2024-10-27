import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import RecentGroup from './RecentGroup'; 
// import GroupCreation from './GroupCreatePage';
// import GroupDetails from './GroupDetails';
function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/recentgroup" element={<RecentGroup />} />
        {/* <Route path="/groupcreation" element={<GroupCreatePage />} /> */}
        {/* <Route path="/group:{groupId}" element={<GroupDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
