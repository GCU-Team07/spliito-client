// App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GroupListPage from "./pages/group/list/GroupListPage";
import GroupCreatePage from "./pages/group/create/GroupCreatePage";
import GroupDetailPage from "./pages/group/detail/GroupDetailPage";
import PaymentAddPage from "./pages/payment/create/PaymentAddPage";
import Styles from "./styles";
import HomePage from "./pages/home/HomePage";
import useMockAdapter from "./hooks/useMockAdapter";
import GroupResultPage from "./pages/group/result/GroupResultPage";
import PaymentDetailPage from "./pages/payment/detail/PaymentDetailPage";

function App() {
    useMockAdapter();

    return (
        <Styles>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        {/* 그룹 리스트 */}
                        <Route path="/groups" element={<GroupListPage />} />

                        {/* 그룹 추가하기 */}
                        <Route
                            path="/groups/new"
                            element={<GroupCreatePage />}
                        />

                        {/* 그룹 추가하기 완료  */}
                        <Route
                            path="/groups/:id/result"
                            element={<GroupResultPage />}
                        />

                        {/* 그룹 상세 */}
                        <Route
                            path="/groups/:id"
                            element={<GroupDetailPage />}
                        />

                        {/* 결제 추가하기 */}
                        <Route
                            path="/groups/:id/payments/new"
                            element={<PaymentAddPage />}
                        />

                        {/* 결제 상세 */}
                        <Route
                            path="/groups/:groupdId/payments/:paymenetId"
                            element={<PaymentDetailPage />}
                        />
                    </Routes>
                </div>
            </Router>
        </Styles>
    );
}

export default App;
