import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';

export default function TeamCard({ teamObj }) {
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
        <Button variant="danger" className="m-2">Delete</Button>
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
};
