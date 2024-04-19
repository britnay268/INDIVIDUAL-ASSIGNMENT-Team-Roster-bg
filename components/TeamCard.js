import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import { deleteTeam } from '../api/teamData';

export default function TeamCard({ teamObj, onUpdate }) {
  const deleteTheTeam = () => {
    if (window.confirm(`Sure you want to delete ${teamObj.name}?`)) {
      deleteTeam(teamObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{teamObj.name}</Card.Title>
        <hr />
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="success" className="m-2">View</Button>
        </Link>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" className="m-2" onClick={deleteTheTeam}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    private: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
