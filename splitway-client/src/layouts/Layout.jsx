import { message } from "antd";
import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";

export default function Layout() {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <>
            {contextHolder}
            <Outlet context={{ messageApi }} />
        </>
    );
}

export const useMessageApi = () => useOutletContext();
