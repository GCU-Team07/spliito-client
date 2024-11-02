import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useEffect } from "react";

export default function useMockAdapter() {
    useEffect(() => {
        const mock = new MockAdapter(axios);

        /**
         * 전체 그룹 불러오기
         */
        mock.onGet("/api/group/all").reply(200, [
            {
                groupId: 1,
                groupName: "부산 여행",
                createdDate: "2024/10/20",
                members: ["고구마", "감자", "옥수수", "양파"],
            },
            {
                groupId: 2,
                groupName: "대전",
                createdDate: "2024/10/21",
                members: ["사과", "배", "귤"],
            },
            {
                groupId: 3,
                groupName: "서울",
                createdDate: "2024/10/22",
                members: ["멜론", "수박"],
            },
        ]);

        /**
         * 전체 결제 내역 불러오기
         */
        mock.onGet(/\/api\/payment\/history\/\d+/).reply(function (config) {
            return [
                200,
                [
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
                ],
            ];
        });

        /**
         * 전체 정산 내역 불러오기
         */
        mock.onGet(/\/api\/settlement\/history\/\d+/).reply(function (config) {
            return [
                200,
                [
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
                ],
            ];
        });

        /**
         * 결제 추가하기
         */
        mock.onPost(/\/api\/payment\/\d+/).reply(function (config) {
            return [
                200,
                {
                    paymentId: 1,
                    eachPrice: 68000,
                    payUsers: ["고구마", "호박"],
                },
            ];
        });
    }, []);
}
