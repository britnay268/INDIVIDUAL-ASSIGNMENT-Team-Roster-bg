/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteMember } from '../api/memberData';
// import getTeamMembers from '../api/teamMemberData';
import { getTeamAndMember } from '../api/mergedData';

export default function MemberCard({ memberObj, onUpdate }) {
  const [team, setTeam] = useState({});
  const deleteTheMember = () => {
    if (window.confirm(`Sure you want to delete ${memberObj.name}?`)) {
      deleteMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  // console.warn(memberObj);
  useEffect(() => {
    const { firebaseKey } = memberObj;
    getTeamAndMember(firebaseKey).then(setTeam);
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '20px 0px' }}>
      <Card.Img variant="top" src={memberObj.image} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{memberObj.name}</Card.Title>
        <p>
          {memberObj.role}
        </p>
        <p>{team.teams?.name}</p>
        <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" className="m-2" onClick={deleteTheMember}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
