/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { viewTeamAndMembers } from '../../api/mergedData';
import MemberCard from '../../components/MemberCard';

export default function ViewTeam() {
  const [teamMembers, setTeamMembers] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  const getAllTeamMembers = () => {
    viewTeamAndMembers(firebaseKey).then(setTeamMembers);
  };

  useEffect(() => {
    getAllTeamMembers();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/teams" passHref>
          <Button>Back To Teams</Button>
        </Link>
      </div>
      <div>
        {teamMembers.members?.length === 0 ? <h1 style={{ textAlign: 'center', color: 'white' }}>This team has no members</h1> : teamMembers.members?.map((memberObj) => (
          <MemberCard key={memberObj.firebaseKey} memberObj={memberObj} onUpdate={getAllTeamMembers} />
        ))}
      </div>
    </>
  );
}
