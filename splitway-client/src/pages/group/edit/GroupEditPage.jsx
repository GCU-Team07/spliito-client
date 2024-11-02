import React from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Flex, Input, Modal, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMessageApi } from "../../../layouts/Layout";
import TagInput from "../create/TagInput";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { groupSchema } from "../../../schema/groupSchema";

const { Title } = Typography;
const { confirm } = Modal;
function GroupEditPage() {
    const navigate = useNavigate();
    const defaultValues = useLocation()?.state?.group;
    const { messageApi } = useMessageApi();

    const form = useForm({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            groupName: defaultValues?.groupName,
            memberName: defaultValues?.members,
        },
    });

    const {
        formState: { isDirty, isValid },
    } = form;

    const handleCreateGroup = () => {
        form.handleSubmit(
            async (values) => {
                console.log(">> Data", values);

                // [TODO] 수정하기 API로 변경 필요
                axios
                    .post("/api/group", values)
                    .then((response) => {
                        console.log("Group Modified:", response.data);

                        messageApi.success("그룹 정보가 수정되었습니다.");
                        navigate(-1);
                    })
                    .catch((error) => console.error(error));
            },
            (errors) => {
                console.error(">> error", errors);
            }
        )();
    };

    function handleGoBack() {
        console.log(isDirty);
        if (isDirty) {
            confirm({
                title: "그룹 수정을 취소하시겠습니까?",
                icon: <ExclamationCircleFilled />,
                content: "저장되지 않은 변경 사항이 있습니다",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk() {
                    console.log("OK");
                    navigate(-1);
                },
            });
        } else {
            navigate(-1);
        }
    }

    return (
        <div className="w-full h-screen flex-col">
            <Flex
                className="w-full px-[40px] py-[20px] bg-slate-50"
                justify="space-between"
            >
                <img
                    src="/images/ic_arrow_left.svg"
                    alt="ic_back"
                    className="ic_button"
                    onClick={handleGoBack}
                />

                <Title level={4} className="m-0">
                    그룹 수정하기
                </Title>

                <span></span>
            </Flex>

            {/* 입력 폼 */}
            <Flex vertical gap={30} className="py-[20px] px-[40px]">
                <form onSubmit={handleCreateGroup}>
                    <Flex vertical gap={30}>
                        <Flex vertical gap={10}>
                            <Title level={5} className="m-0">
                                그룹 이름
                            </Title>

                            <Controller
                                name="groupName"
                                control={form.control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="그룹의 이름을 작성해 주세요"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </Flex>

                        <Flex vertical gap={10}>
                            <Title level={5} className="m-0">
                                그룹 멤버
                            </Title>

                            <Controller
                                name="memberName"
                                control={form.control}
                                render={({ field }) => (
                                    <TagInput
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </Flex>
                    </Flex>
                </form>

                <Button
                    type="primary"
                    block
                    size="large"
                    className="py-[20px]"
                    onClick={handleCreateGroup}
                    disabled={!isValid}
                >
                    수정하기
                </Button>
            </Flex>
        </div>
    );
}

export default GroupEditPage;
