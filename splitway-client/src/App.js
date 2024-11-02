// App.js
import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GroupListPage from "./pages/group/list/GroupListPage";
import GroupCreatePage from "./pages/group/create/GroupCreatePage";
import GroupDetailPage from "./pages/group/detail/GroupDetailPage";
import PaymentAddPage from "./pages/payment/PaymentAddPage";
import PaymentDetailPage from "./pages/payment/PaymentDetailPage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Styles from "./styles";
import HomePage from "./pages/home/HomePage";

function App() {
    useEffect(() => {
        // 초기 데이터를 위해 MockAdapter 설정
        const mock = new MockAdapter(axios);
        mock.onGet("/api/group/all").reply(200, [
            {
                groupId: 1,
                groupName: "부산 여행",
                createdDate: "2024/10/20",
                members: ["고구마", "감자", "옥수수", "양파"],
            },
            {
                groupId: 2,
                groupName: "대전",
                createdDate: "2024/10/21",
                members: ["사과", "배", "귤"],
            },
            {
                groupId: 3,
                groupName: "서울",
                createdDate: "2024/10/22",
                members: ["멜론", "수박"],
            },
        ]);
    }, []);

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
