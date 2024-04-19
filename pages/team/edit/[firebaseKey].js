import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleTeam } from '../../../api/teamData';
import TeamForm from '../../../components/forms/TeamForm';

export default function EditTeam() {
  const [editTeam, setEditTeam] = useState();
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditTeam);
  }, [firebaseKey]);

  return (<TeamForm obj={editTeam} />);
}
