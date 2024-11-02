import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Flex, Input, InputNumber, Select, Typography } from "antd";
import { useMessageApi } from "../../../layouts/Layout";
import { paymentSchema } from "../../../schema/paymentSchema";

const { Title } = Typography;
function PaymentAddPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { messageApi } = useMessageApi();

    const members = useLocation()?.state?.members;
    const memberOptions = members.map((member) => {
        return { value: member, key: member };
    });

    const form = useForm({
        resolver: zodResolver(paymentSchema),
    });

    const handleAddPayment = () => {
        form.handleSubmit(
            async (values) => {
                console.log(">> Data", values);

                axios
                    .post(`/api/payment/${id}`, values)
                    .then((response) => {
                        console.log("Payment Added:", response.data);

                        messageApi.success("결제가 등록되었습니다.");
                        navigate(-1);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
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
                    결제 추가하기
                </Title>

                <span></span>
            </Flex>

            {/* 입력 폼 */}
            <Flex vertical gap={30} className="py-[20px] px-[40px]">
                <form onSubmit={handleAddPayment}>
                    <Flex vertical gap={30}>
                        <Flex vertical gap={10}>
                            <Title level={5} className="m-0">
                                결제한 사람
                            </Title>

                            <Controller
                                name="paidMember"
                                control={form.control}
                                render={({ field }) => (
                                    <Select
                                        options={memberOptions}
                                        placeholder="결제한 사람을 선택해 주세요"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </Flex>

                        <Flex vertical gap={10}>
                            <Title level={5} className="m-0">
                                결제 내역
                            </Title>

                            <Controller
                                name="itemName"
                                control={form.control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="어떤 항목을 결제했는지 작성해 주세요 (ex. 교통비)"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </Flex>

                        <Flex vertical gap={10}>
                            <Title level={5} className="m-0">
                                금액
                            </Title>

                            <Controller
                                name="itemPrice"
                                control={form.control}
                                render={({ field }) => (
                                    <InputNumber
                                        prefix={<p>₩</p>}
                                        min={1}
                                        formatter={(value) =>
                                            `${value}`.replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ","
                                            )
                                        }
                                        placeholder="3,000"
                                        className="w-full"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                        </Flex>

                        <Flex vertical gap={10}>
                            <Title level={5} className="m-0">
                                지불할 사람
                            </Title>

                            <Controller
                                name="payMemberName"
                                control={form.control}
                                render={({ field }) => (
                                    <Select
                                        options={memberOptions}
                                        mode="multiple"
                                        placeholder="비용을 지불할 사람을 선택해 주세요"
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
                    onClick={handleAddPayment}
                    disabled={!form.formState.isValid}
                >
                    추가하기
                </Button>
            </Flex>
        </div>
    );
}

export default PaymentAddPage;
