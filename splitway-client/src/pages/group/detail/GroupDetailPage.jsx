import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Card, Flex, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
function GroupDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    // [TODO] 그룹 구성원 불러오기 API 수정 요청해서 id로 조회 필요
    const group = useLocation()?.state?.group;

    const [payments, setPayments] = useState([]);
    const [settelments, setSettlements] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/payment/history/${id}`)
            .then((response) => {
                setPayments(response.data);
            })
            .catch((error) => {
                console.error("정산 데이터 로딩 오류:", error);
            });

        axios
            .get(`/api/settlement/history/${id}`)
            .then((response) => {
                setSettlements(response.data);
            })
            .catch((error) => {
                console.error("정산 데이터 로딩 오류:", error);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleAddPayments() {
        navigate(`/groups/${id}/payments/new`, {
            state: { members: group.members },
        });
    }

    function handleModify() {
        navigate(`/groups/edit/${id}`, { state: { group } });
    }

    if (!group) return <div>Loading...</div>;

    return (
        <div className="w-full mh-screen flex-col">
            <Flex
                vertical
                className="w-full bg-white backdrop-blur-md pt-[20px] px-[40px] pb-[50px]"
                align="center"
                gap={30}
            >
                <Flex className="w-full h-full " justify="space-between">
                    <img
                        src="/images/ic_arrow_left.svg"
                        alt="ic_back"
                        className="ic_button"
                        onClick={() => navigate(-1)}
                    />
                    <EditOutlined onClick={handleModify} />
                </Flex>

                <Flex vertical gap={30} align="center">
                    <Title level={3}>{group.groupName}</Title>
                    <Text className=" text-neutral-500">
                        {group.createdDate}
                    </Text>
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
                        onClick={handleAddPayments}
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
