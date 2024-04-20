import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { deleteTeam } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteTheTeam = () => {
    if (window.confirm(`Sure you want to delete ${teamObj.name}?`)) {
      deleteTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        {teamObj.private === true ? <p>Private Team</p> : <p>Public Team</p>}
        {/* <p style={{ fontSize: '12px', textAlign: 'right' }}>Created by: { teamObj.uid === user.uid ? user.displayName : user.displayName}</p> */}
        <hr />

        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">View</Button>
        </Link>

        {teamObj.uid === user.uid ? (
          <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
            <Button variant="info">Edit</Button>
          </Link>
        ) : ''}

        {teamObj.uid === user.uid ? <Button variant="danger" className="m-2" onClick={deleteTheTeam}>Delete</Button> : ''}
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    private: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
