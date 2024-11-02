// RecentGroup.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecentGroup.css";
import { Card, Flex, Typography } from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

function GroupListPage() {
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

    // 그룹 멤버 표시 형식, members가 없을 경우 빈 배열로 설정
    const formatMembers = (members = []) => {
        if (members.length <= 2) {
            return members.join(", ");
        } else {
            return `${members.slice(0, 2).join(", ")} 외 ${
                members.length - 2
            }명`;
        }
    };

    // 그룹 항목 클릭 시 상세 페이지로 이동
    const handleGroupClick = (group) => {
        navigate(`/groups/${group.groupId}`, {
            state: {
                group,
            },
        });
    };

    return (
        <div className="custom-recent-groups-section">
            <div className="custom-recent-groups-header">
                {/* 홈으로 돌아가는 화살표 버튼 */}
                <img
                    className="ic_button"
                    src="/images/ic_arrow_left.svg"
                    alt="ic_left"
                    onClick={() => navigate(-1)}
                />

                {/* Recent Group 제목 */}
                <Title level={4} style={{ margin: 0, justifySelf: "center" }}>
                    Recent Group
                </Title>

                <span></span>
            </div>

            <Flex vertical gap={10} className="w-full mt-[30px]" align="center">
                {groups.map((group, index) => (
                    <Card
                        key={index}
                        bordered={false}
                        className="w-[80%]"
                        hoverable={true}
                        onClick={() => handleGroupClick(group)}
                    >
                        {/* 그룹 위치 */}
                        <Flex justify="space-between" className="mb-[10px]">
                            <Title level={5} className="mt-0">
                                {group.groupName}
                            </Title>
                        </Flex>

                        {/* 날찌, 멤버 정보 */}
                        <Flex gap={5}>
                            <ClockCircleOutlined />
                            <Text>{group.createdDate}</Text>
                        </Flex>

                        <Flex gap={5}>
                            <UserOutlined />
                            <Text>{formatMembers(group.members)}</Text>
                        </Flex>
                    </Card>
                ))}
            </Flex>
        </div>
    );
}

export default GroupListPage;
