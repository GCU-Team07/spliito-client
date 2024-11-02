import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { Button, Flex, List, Typography } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

function HomePage() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // 초기 그룹 데이터 가져오기
        axios
            .get("/api/group/all")
            .then((response) => {
                setGroups(response.data);
            })
            .catch((error) => {
                console.error("그룹 데이터 로딩 오류:", error);
            });
    }, []);

    // 최근 그룹 페이지로 이동
    const handleArrowClick = () => {
        navigate("/groups");
    };

    // 그룹 생성 페이지로 이동
    const handleStartClick = () => {
        navigate("/groups/new");
    };

    // 특정 그룹의 세부 페이지로 이동
    const handleGroupClick = (group) => {
        navigate(`/groups/${group.groupId}`, {
            state: {
                group,
            },
        });
    };

    return (
        <div className="container flex-col flex-center">
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
                renderItem={(group) => (
                    <ListItem
                        item={group}
                        onClick={() => handleGroupClick(group)}
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
            <Text>{item.groupName}</Text>
            <Text>{item.createdDate}</Text>
        </List.Item>
    );
};

export default HomePage;
