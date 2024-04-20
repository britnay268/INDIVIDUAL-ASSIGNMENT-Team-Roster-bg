/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import TeamCard from '../components/TeamCard';
import { getPublicTeams } from '../api/teamData';

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);

  const { user } = useAuth();

  const getAllTeams = () => {
    getPublicTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <>
      <div className="text-center my-4">
        <Link href="/team/new" passHref>
          <Button>Create a Team</Button>
        </Link>
      </div>
      <div className="d-flex flex-wrap">
        {teams.length === 0 ? <h1 style={{ textAlign: 'center', color: 'white', width: '100%' }}>You Have No Teams</h1> : teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </>
  );
}
