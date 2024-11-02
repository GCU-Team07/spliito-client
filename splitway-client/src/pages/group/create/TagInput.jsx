import { Button, Flex, Input, Space, Tag } from "antd";
import React, { useState } from "react";
import { useMessageApi } from "../../../layouts/Layout";

export default function TagInput({ value, onChange }) {
    const [input, setInput] = useState("");
    const { messageApi } = useMessageApi();

    const handleInput = () => {
        const newTag = input.trim();

        if (!newTag) {
            messageApi.error("멤버의 이름을 입력해 주세요.");
            return;
        }
        if (value.includes(newTag)) {
            messageApi.error("이미 추가된 멤버입니다.");
            return;
        }

        const newTags = [...value, newTag];

        onChange(newTags);
        setInput("");
    };

    const handleOnClose = (idx) => {
        const newTags = value.filter((_, index) => index !== idx);
        onChange(newTags);
    };

    return (
        <Flex vertical gap={10}>
            <Space.Compact className="w-full">
                <Input
                    placeholder="멤버를 추가해 주세요"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button type="primary" className="m-0" onClick={handleInput}>
                    추가
                </Button>
            </Space.Compact>

            <Flex gap={2}>
                {value.map((tag, idx) => (
                    <Tag closable key={idx} onClose={() => handleOnClose(idx)}>
                        {tag}
                    </Tag>
                ))}
            </Flex>
        </Flex>
    );
}
