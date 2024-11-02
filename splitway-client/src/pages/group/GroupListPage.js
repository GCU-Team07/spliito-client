import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GroupListPage() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // 전체 그룹 불러오기 API 호출
        axios.get('/group/all')
            .then(response => {
                setGroups(response.data); // 데이터 형식에 맞게 설정
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>그룹 목록</h1>
            <Link to="/groups/new">그룹 생성</Link>
            <ul>
                {groups.map(group => (
                    <li key={group.groupId}>
                        <Link to={`/groups/${group.groupId}`}>{group.groupName} - {group.createdDate}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GroupListPage;
