import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form,
  FormGroup,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createTeam, updateTeam } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  private: true,
};

export default function TeamForm({ obj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid });
  const router = useRouter();

  useEffect(() => {
    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    // Destructuring name and value from the event
    const { name, value } = e.target;
    // prevState is what already exists
    setFormInput((prevState) => ({
      // This makes a copy of everything in formInpput
      ...prevState,
      // Adds a new key.value pair with the name and value gathered from the event target
      [name]: value,
      // Then updates formInput with new information
    }));
  };

  const handleToggleChange = () => {
    setFormInput((prevState) => ({
      ...prevState,
      // this updates the private property in formInput by using ! to toggle the value meaning if it was true, then it becomes false and vice versa.
      private: !prevState.private,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput };
    if (obj.firebaseKey) {
      updateTeam(formInput).then(() => router.push('/teams'));
    } else {
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => {
          router.push('/teams');
        });
      });
    }
  };

  return (
    <>
      <div className="text-center my-4">
        <Link href="/teams" passHref>
          <Button>Back To Teams</Button>
        </Link>
      </div>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

        <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a team name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <div>
          <FormGroup>
            <Form.Label style={{ color: 'white' }}>Make Team Private or Public</Form.Label>
          </FormGroup>
          <ToggleButtonGroup type="checkbox" style={{ marginBottom: '10px' }}>
            <ToggleButton
              checked={formInput.private}
              value={formInput}
              onClick={handleToggleChange}
              style={{ backgroundColor: formInput.private ? 'red' : 'green', border: 'none', display: 'block' }}
            >
              {formInput.private ? 'Private' : 'Public'}
            </ToggleButton>
          </ToggleButtonGroup>

          <Button type="submit" style={{ display: 'block', margin: '0 auto' }}>{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
        </div>
      </Form>
    </>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    private: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};
