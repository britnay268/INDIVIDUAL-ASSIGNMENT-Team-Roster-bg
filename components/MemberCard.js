import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function MemberCard({ memberObj }) {
  return (
    <Card style={{ width: '18rem', margin: '0 auto' }}>
      <Card.Img variant="top" src={memberObj.image} style={{ height: '300px' }} />
      <Card.Body style={{ height: '' }}>
        <Card.Title>{memberObj.name}</Card.Title>
        <p>
          {memberObj.role}
        </p>
        <Link href="/edit" passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" className="m-2">
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
  }).isRequired,
};
