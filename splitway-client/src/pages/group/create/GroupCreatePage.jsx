import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { groupSchema } from "./groupSchema";
import TagInput from "./TagInput";
import { useMessageApi } from "../../../layouts/Layout";

const { Title } = Typography;
function GroupCreatePage() {
    const navigate = useNavigate();
    const { messageApi } = useMessageApi();

    const form = useForm({
        resolver: zodResolver(groupSchema),
        defaultValues: {
            memberName: [],
        },
    });

    const handleCreateGroup = () => {
        form.handleSubmit(
            async (values) => {
                console.log(">> Data", values);

                axios
                    .post("/api/group", values)
                    .then((response) => {
                        console.log("Group Created:", response.data);

                        messageApi.success("그룹이 생성되었습니다.");
                        navigate(`/groups/result/${response.data.groupUrl}`, {
                            replace: true,
                        });
                    })
                    .catch((error) => console.error(error));
            },
            (errors) => {
                console.error(">> error", errors);
            }
        )();
    };

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
                    onClick={() => navigate(-1)}
                />

                <Title level={4} className="m-0">
                    그룹 생성하기
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
                    disabled={!form.formState.isValid}
                >
                    추가하기
                </Button>
            </Flex>
        </div>
    );
}

export default GroupCreatePage;
