import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentAddPage() {
    const { id } = useParams();
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [paidMember, setPaidMember] = useState('');
    const [payMembers, setPayMembers] = useState(['']);
    const navigate = useNavigate();

    const handleAddPayment = () => {
        axios.post(`/payment/${id}`, {
            paidMember: parseInt(paidMember),
            itemName: itemName,
            itemPrice: parseInt(itemPrice),
            payMembers: payMembers
        })
        .then(response => {
            console.log('Payment Added:', response.data);
            navigate(`/groups/${id}`);
        })
        .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>결제 내역 추가</h1>
            <input 
                type="text" 
                placeholder="결제 항목" 
                value={itemName} 
                onChange={e => setItemName(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="결제 금액" 
                value={itemPrice} 
                onChange={e => setItemPrice(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="결제자 ID" 
                value={paidMember} 
                onChange={e => setPaidMember(e.target.value)} 
            />
            <button onClick={() => setPayMembers([...payMembers, ''])}>결제 멤버 추가</button>
            {payMembers.map((member, index) => (
                <input 
                    key={index} 
                    type="text" 
                    placeholder="결제 멤버 이름" 
                    value={member} 
                    onChange={e => {
                        const newPayMembers = [...payMembers];
                        newPayMembers[index] = e.target.value;
                        setPayMembers(newPayMembers);
                    }} 
                />
            ))}
            <button onClick={handleAddPayment}>추가</button>
        </div>
    );
}

export default PaymentAddPage;
