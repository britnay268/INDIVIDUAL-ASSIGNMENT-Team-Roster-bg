/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';

export default function ShowTeams() {
  const [teams, setTeams] = useState([]);

  const { user } = useAuth();

  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTeams();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {teams.length === 0 ? <h1 style={{ textAlign: 'center', color: 'white' }}>There are no teams created</h1> : teams.map((team) => (
        <TeamCard key={team.firebaseKey} teamObj={team} />
      ))}
    </div>
  );
}
