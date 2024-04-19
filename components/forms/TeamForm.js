import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FloatingLabel, Form,
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
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
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
          <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
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
