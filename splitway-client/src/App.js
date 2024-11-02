// App.js
import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GroupListPage from "./pages/group/list/GroupListPage";
import GroupCreatePage from "./pages/group/create/GroupCreatePage";
import GroupDetailPage from "./pages/group/detail/GroupDetailPage";
import PaymentAddPage from "./pages/payment/create/PaymentAddPage";
import Styles from "./styles";
import HomePage from "./pages/home/HomePage";
import useMockAdapter from "./hooks/useMockAdapter";
import GroupResultPage from "./pages/group/result/GroupResultPage";
import PaymentDetailPage from "./pages/payment/detail/PaymentDetailPage";
import Layout from "./layouts/Layout";
import GroupEditPage from "./pages/group/edit/GroupEditPage";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            // 홈
            {
                path: "/",
                element: <HomePage />,
            },
            // 그룹
            {
                path: "/groups",
                element: <GroupListPage />,
            },
            {
                path: "/groups/new",
                element: <GroupCreatePage />,
            },
            {
                path: "/groups/result/:id",
                element: <GroupResultPage />,
            },
            {
                path: "/groups/:id",
                element: <GroupDetailPage />,
            },
            {
                path: "/groups/edit/:id",
                element: <GroupEditPage />,
            },
            // 결제
            {
                path: "/groups/:id/payments/new",
                element: <PaymentAddPage />,
            },
            {
                path: "/groups/:groupId/payments/:paymentId",
                element: <PaymentDetailPage />,
            },
        ],
    },
]);

function App() {
    useMockAdapter();

    return (
        <Styles>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </Styles>
    );
}

export default App;
