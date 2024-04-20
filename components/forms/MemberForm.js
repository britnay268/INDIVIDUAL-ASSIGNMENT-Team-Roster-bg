import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import Link from 'next/link';
import { createMember, updateMember } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';
import { getTeams } from '../../api/teamData';

const initialState = {
  name: '',
  image: '',
  role: '',
};

export default function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, uid: user.uid };
    if (obj.firebaseKey) {
      updateMember(payload).then(() => router.push('/members'));
    } else {
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/members');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      <FloatingLabel controlId="floatingInput1" label="Enter Your Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Add A Picture" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter a picture url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Role">
        <Form.Select
          aria-label="Role"
          name="role"
          onChange={handleChange}
          className="mb-3"
          value={formInput.role}
          required
        >
          <option value="">Player or Judge?</option>
          <option value="Player">Player</option>
          <option value="Judge">Judge</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Author">
        <Form.Select
          aria-label="Author"
          name="team_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.team_id}
          required
        >
          <option value="">Select a Team</option>
          {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      <div className="text-center my-4">
        <Button type="submit" style={{ marginRight: '20px' }}>{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
        <Link href="/members" passHref>
          <Button style={{ backgroundColor: 'darkviolet', border: 'darkviolet' }}>Back To Members</Button>
        </Link>
      </div>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
    team_id: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};
