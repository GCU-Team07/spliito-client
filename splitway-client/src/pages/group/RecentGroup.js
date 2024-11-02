// RecentGroup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecentGroup.css";
import { Card, Flex, Typography } from "antd";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function RecentGroup({ groups, onDeleteGroup }) {
    const navigate = useNavigate();

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
    const handleGroupClick = (groupId) => {
        navigate(`/group/${groupId}`);
    };

    return (
        <div className="custom-recent-groups-section">
            <div className="custom-recent-groups-header">
                {/* 홈으로 돌아가는 화살표 버튼 */}
                <img
                    className="ic_button"
                    src="/images/ic_arrow_left.svg"
                    alt="ic_left"
                    onClick={() => navigate("/")}
                />

                {/* Recent Group 제목 */}
                <Title level={4} style={{ margin: 0, justifySelf: "center" }}>
                    Recent Group
                </Title>

                <span></span>
            </div>

            <Flex vertical gap={10} style={{ width: "100%" }} align="center">
                {groups.map((group, index) => (
                    <Card
                        key={index}
                        bordered={false}
                        style={{ width: "80%" }}
                        hoverable={true}
                        onClick={() => handleGroupClick(group.groupId)}
                    >
                        {/* 그룹 위치 */}
                        <Flex justify="space-between">
                            <Title level={5} style={{ margin: "0 0 10px" }}>
                                {group.location}
                            </Title>
                        </Flex>

                        {/* 날찌, 멤버 정보 */}
                        <Flex gap={5}>
                            <ClockCircleOutlined />
                            <Text>{group.date}</Text>
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

export default RecentGroup;
