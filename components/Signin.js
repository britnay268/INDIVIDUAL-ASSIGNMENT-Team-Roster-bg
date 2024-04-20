import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';
import Header from './Header';

function Signin() {
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          margin: '0 auto',
          color: 'darkviolet',
          fontFamily: 'Luminari',
        }}
      >
        <Header />
        <h4>Welcome to Game Night Festivities(GNF)!</h4>
        <div style={{ color: 'thistle' }}>
          <h6>Want to create teams for your next Game Night? Well, you are in the right place!!</h6>
          <p>Click the button below to get started!</p>
        </div>
        <Button type="button" size="lg" className="copy-btn" onClick={signIn} style={{ maxWidth: '300px', margin: '0px auto' }}>
          Sign In
        </Button>
      </div>
    </>
  );
}

export default Signin;
