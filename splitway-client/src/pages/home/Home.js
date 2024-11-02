import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Button, Flex, List, Typography } from "antd";

const { Title, Text } = Typography;

function Home({ groups }) {
    const navigate = useNavigate();

    // 최근 그룹 페이지로 이동
    const handleArrowClick = () => {
        navigate("/recentgroup");
    };

    // 그룹 생성 페이지로 이동
    const handleStartClick = () => {
        navigate("/groupCreatePage");
    };

    // 특정 그룹의 세부 페이지로 이동
    const handleGroupClick = (groupId) => {
        navigate(`/group/${groupId}`);
    };

    return (
        <div className="home-container">
            <Flex vertical gap={30}>
                <Title level={2}>Splitway</Title>
                <Text style={{ color: "#666" }}>
                    비용을 간단하게 나누는 스마트한 방법, <br />
                    Splitway로 빠르게 정산하세요.
                </Text>

                {/* 프로필 이미지 */}
                <div className="profile-circle">
                    <img src={`/splitway.png`} alt="프로필 이미지" />
                </div>

                {/* 시작하기 버튼 */}
                <Button
                    type="primary"
                    size="large"
                    style={{ padding: "30px 140px", width: "350px" }}
                    onClick={handleStartClick}
                >
                    시작하기
                </Button>
            </Flex>

            {/* 최근 그룹 섹션 */}
            <List
                className="recent-groups-section"
                header={
                    <Flex justify="space-between" align="center">
                        <Title
                            level={5}
                            style={{
                                textAlign: "center",
                                margin: "5px 0",
                            }}
                        >
                            Recent Group
                        </Title>
                        <img
                            className="ic_button"
                            src="/images/ic_arrow.svg"
                            alt="ic_arrow"
                            onClick={handleArrowClick}
                        />
                    </Flex>
                }
                bordered
                dataSource={groups}
                renderItem={(item) => (
                    <ListItem
                        item={item}
                        onClick={() => handleGroupClick(item.groupId)}
                    />
                )}
            />
        </div>
    );
}

const ListItem = ({ item, onClick }) => {
    return (
        <List.Item
            key={item.groupId}
            onClick={onClick}
            className="recent-group-item"
        >
            <Text>{item.location}</Text>
            <Text>{item.date}</Text>
        </List.Item>
    );
};

export default Home;
