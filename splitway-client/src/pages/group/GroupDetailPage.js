import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function GroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        // 그룹 상세 정보 불러오기
        axios.get(`/group/${id}/members`)
            .then(response => {
                setMembers(response.data);
            })
            .catch(error => console.error(error));
    }, [id]);

    if (!group) return <div>Loading...</div>;

    return (
        <div>
            <h1>{group.groupName}</h1>
            <p>멤버: {members.join(', ')}</p>
            <Link to={`/payment/${id}/new`}>결제 추가</Link>
        </div>
    );
}

export default GroupDetailPage;
