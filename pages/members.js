/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
    <>
      <div className="text-center my-4">
        <Link href="/member/new" passHref>
          <Button>Create a Player</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap justify-content-between">
        {members.length === 0 ? <h1 style={{ color: 'white', textAlign: 'center', width: '100%' }}>You Have No Players</h1> : members.map((member) => (
          <MemberCard key={member.firebaseKey} memberObj={member} onUpdate={getAllMembers} />
        ))}
      </div>
    </>
  );
}
