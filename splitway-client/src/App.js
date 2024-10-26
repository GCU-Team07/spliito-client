import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GroupListPage from './GroupListPage';
import GroupCreatePage from './GroupCreatePage';
import GroupDetailPage from './GroupDetailPage';
import PaymentAddPage from './PaymentAddPage';
import PaymentDetailPage from './PaymentDetailPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<GroupListPage />} />
                    <Route path="/groups/new" element={<GroupCreatePage />} />
                    <Route path="/groups/:id" element={<GroupDetailPage />} />
                    <Route path="/groups/:id/payments/new" element={<PaymentAddPage />} />
                    <Route path="/groups/:id/payments" element={<PaymentDetailPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
