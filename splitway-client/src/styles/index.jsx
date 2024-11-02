import { ConfigProvider } from "antd";

const Styles = ({ children }) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#7580EA",
                    fontFamily: "Pretendard",
                },
                components: {
                    Typography: {
                        titleMarginBottom: "10px",
                        titleMarginTop: 0,
                    },
                    Select: {
                        optionSelectedColor: "#7580EA",
                        optionSelectedBg: "#F2F3FD",
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default Styles;
