// App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GroupListPage from "./pages/group/list/GroupListPage";
import GroupCreatePage from "./pages/group/create/GroupCreatePage";
import GroupDetailPage from "./pages/group/detail/GroupDetailPage";
import PaymentAddPage from "./pages/payment/PaymentAddPage";
import PaymentDetailPage from "./pages/payment/PaymentDetailPage";
import Styles from "./styles";
import HomePage from "./pages/home/HomePage";
import useMockAdapter from "./hooks/useMockAdapter";

function App() {
    useMockAdapter();

    return (
        <Styles>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/groups" element={<GroupListPage />} />
                        <Route
                            path="/groups/new"
                            element={<GroupCreatePage />}
                        />
                        <Route
                            path="/groups/:id"
                            element={<GroupDetailPage />}
                        />
                        <Route
                            path="/groups/:id/payments/new"
                            element={<PaymentAddPage />}
                        />
                        <Route
                            path="/groups/:id/payments"
                            element={<PaymentDetailPage />}
                        />
                    </Routes>
                </div>
            </Router>
        </Styles>
    );
}

export default App;
