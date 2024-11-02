import { z } from "zod";

/**
 * 그룹 내역 추가 시 사용하는 스키마
 */
export const groupSchema = z.object({
    groupName: z.string(),
    memberName: z.array(z.string()).min(1),
});
