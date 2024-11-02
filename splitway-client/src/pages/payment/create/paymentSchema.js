import { z } from "zod";

/**
 * 결제 내역 추가 시 사용하는 스키마
 */
export const paymentSchema = z.object({
    paidMember: z.string(),
    itemName: z.string(),
    itemPrice: z.number(),
    payMemberName: z.array(z.string()).min(1),
});

export const defaultPromptSchema = {};
