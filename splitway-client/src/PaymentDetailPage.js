import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PaymentDetailPage() {
    const { id } = useParams();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // 결제 내역 불러오기
        axios.get(`/payment/history/${id}`)
            .then(response => setPayments(response.data))
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div>
            <h1>결제 내역</h1>
            <ul>
                {payments.map(payment => (
                    <li key={payment.paymentId}>
                        {payment.itemName} - {payment.itemPrice}원, 결제자: {payment.paidMemberName}, 
                        참여자: {payment.payMemberNames.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PaymentDetailPage;
