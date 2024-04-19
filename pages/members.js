/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import MemberCard from '../components/MemberCard';

export default function ShowMembers() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-between">
      {members.length === 0 ? <h1 style={{ textAlign: 'center', color: 'white' }}>There are no members created</h1> : members.map((member) => (
        <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
      ))}
    </div>
  );
}
