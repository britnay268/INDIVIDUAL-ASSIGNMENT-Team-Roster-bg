import { getSingleMember } from './memberData';
import { getSingleTeam } from './teamData';

const getTeamAndMember = async (memberFirebaseKey) => {
  //  GET THE SINGLE ORDER
  const members = await getSingleMember(memberFirebaseKey);

  const teams = await getSingleTeam(members.team_id);

  return ({ ...members, teams });
};

export default getTeamAndMember;
