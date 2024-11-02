import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GroupCreatePage() {
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState(['']);
    const navigate = useNavigate();

    const handleCreateGroup = () => {
        axios.post('/group', {
            groupName: groupName,
            members: members
        })
        .then(response => {
            console.log('Group Created:', response.data);
            navigate(`/groups/${response.data.groupUrl}`);
        })
        .catch(error => console.error(error));
    };

    return (
        <div>
            <h1>그룹 생성하기</h1>
            <input 
                type="text" 
                placeholder="그룹 이름" 
                value={groupName} 
                onChange={e => setGroupName(e.target.value)} 
            />
            <button onClick={() => setMembers([...members, ''])}>멤버 추가</button>
            {members.map((member, index) => (
                <input 
                    key={index} 
                    type="text" 
                    placeholder="멤버 이름" 
                    value={member} 
                    onChange={e => {
                        const newMembers = [...members];
                        newMembers[index] = e.target.value;
                        setMembers(newMembers);
                    }} 
                />
            ))}
            <button onClick={handleCreateGroup}>그룹 생성</button>
        </div>
    );
}

export default GroupCreatePage;
