import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Flex, Row, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
function GroupDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    // const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);

    const group = {
        groupId: 1,
        groupName: "신나는 부산 여행",
        location: "부산",
        date: "2024/10/20",
        members: ["고구마", "감자", "옥수수", "양파"],
    };

    const payments = [
        {
            itemName: "KTX",
            itemPrice: 230000,
            paidMemberName: "고구마",
            payMemberName: ["고구마", "감자", "호박"],
        },
        {
            itemName: "점심 - 밀면",
            itemPrice: 56000,
            paidMemberName: "고구마",
            payMemberName: ["고구마", "감자", "호박"],
        },
        {
            itemName: "카페",
            itemPrice: 230000,
            paidMemberName: "감자",
            payMemberName: ["고구마", "감자", "호박"],
        },
    ];

    const settelments = [
        {
            payRelationShip: "고구마 -> 호박",
            paymentPrice: 68000,
        },
        {
            payRelationShip: "호박 -> 고구마",
            paymentPrice: 40000,
        },
        {
            payRelationShip: "호박 -> 감자",
            paymentPrice: 32000,
        },
    ];

    // useEffect(() => {
    //     // 그룹 상세 정보 불러오기
    //     axios.get(`/group/${id}/members`)
    //         .then(response => {
    //             setMembers(response.data);
    //         })
    //         .catch(error => console.error(error));
    // }, [id]);

    // if (!group) return <div>Loading...</div>;

    return (
        <div className="group-detail-container">
            <Flex
                vertical
                className="group-detail-header"
                align="center"
                gap={30}
            >
                <Flex className="w-full" justify="space-between">
                    <img
                        src="/images/ic_arrow_left.svg"
                        alt="ic_back"
                        className="ic_button"
                        onClick={() => navigate(-1)}
                    />
                    <EditOutlined />
                </Flex>

                <Flex vertical gap={30} align="center">
                    <Title level={3}>{group.groupName}</Title>
                    <Text className=" text-neutral-500">{group.date}</Text>
                    <Text className="text-neutral-500">
                        <b>멤버</b> {group.members.join(", ")}
                    </Text>
                </Flex>
            </Flex>

            {/* 결제 내역 */}
            <Flex className="w-full px-[40px] py-[30px]" vertical gap={20}>
                <Flex justify="space-between" align="center" className="w-full">
                    <Title level={5} className="m-0">
                        결제 내역
                    </Title>

                    <Button
                        className="m-0"
                        type="primary"
                        onClick={() => navigate(`/payment/${id}/new`)}
                    >
                        결제 추가
                    </Button>
                </Flex>

                <Flex vertical gap={10}>
                    {payments.map((payment, i) => (
                        <Card key={i} bordered>
                            <Flex vertical gap={10}>
                                <Flex justify="space-between">
                                    <Title level={5} className="m-0">
                                        {payment.itemName}
                                    </Title>
                                    <Text>
                                        ₩{payment.itemPrice.toLocaleString()}
                                    </Text>
                                </Flex>

                                <Flex justify="space-between">
                                    <Text className="text-stone-500">
                                        {payment.paidMemberName} 지불
                                    </Text>
                                    <Text className="text-stone-500">
                                        {payment.payMemberName.join(",")}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            </Flex>

            {/* 정산 결과 */}
            <Flex className="w-full px-[40px] py-[30px]" vertical gap={20}>
                <Title level={5} className="m-0">
                    정산 결과
                </Title>

                <Flex vertical gap={10}>
                    {settelments.map((settlement, i) => (
                        <Card key={i} bordered>
                            <Flex justify="space-between">
                                <Title level={5} className="m-0">
                                    {settlement.payRelationShip}
                                </Title>
                                <Text>
                                    ₩{settlement.paymentPrice.toLocaleString()}
                                </Text>
                            </Flex>
                        </Card>
                    ))}
                </Flex>
            </Flex>
        </div>
    );
}

export default GroupDetailPage;
