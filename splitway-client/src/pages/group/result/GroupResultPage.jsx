import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text } = Typography;
export default function GroupResultPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleShare = () => {
        // navigator.clipboard API 이용해서 복사
        // 또는 공유하기 API 연결
    };

    const handleGoDetail = () => {
        // [TODO] 그룹 생성 -> 완료 화면에서는 groupUrl을 받음, 이걸로도 그룹 상세 조회 가능한지 확인 필요
        navigate(`/groups/${id}`, { replace: true });
    };

    return (
        <div className="w-full h-screen flex-col justify-center">
            <Flex
                className="w-full h-[80%] px-[40px] py-[20px] "
                vertical
                justify="space-between"
            >
                <Flex vertical gap={50} align="center" className="w-full">
                    {/* 상단 */}
                    <Flex vertical gap={20} align="center">
                        <Title level={3} className="m-0">
                            그룹이 생성되었어요!
                        </Title>
                        <Text className="text-stone-500">
                            생성된 링크를 복사하여 그룹을 공유해 보세요!
                        </Text>
                    </Flex>

                    {/* 이미지 */}
                    <CheckCircleTwoTone
                        twoToneColor="#7580EA"
                        className="text-[100px]"
                    />

                    {/* URL */}
                    <div className="w-[80%] rounded-xl p-[20px] border-indigo-200 bg-indigo-100 border-[1px] text-center">
                        <Text underline>https://spiltto.com/groups/{id}</Text>
                    </div>
                </Flex>

                {/* 하단 */}
                <Flex vertical gap={20} className="w-full" align="center">
                    <Button
                        type="primary"
                        size="large"
                        className="w-[80%] py-[20px]"
                        onClick={handleShare}
                    >
                        공유하기
                    </Button>

                    <Flex
                        gap={10}
                        align="center"
                        className="cursor-pointer"
                        onClick={handleGoDetail}
                    >
                        <Text className="text-stone-800">확인하러 가기</Text>
                        <img
                            src="/images/ic_arrow.svg"
                            alt="ic_arrow"
                            className=" h-[14px]"
                        />
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
}
