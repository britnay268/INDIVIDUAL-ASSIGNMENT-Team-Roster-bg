import { getSingleMember, getTeamMembers } from './memberData';
import { getSingleTeam } from './teamData';

const getTeamAndMember = async (memberFirebaseKey) => {
  const members = await getSingleMember(memberFirebaseKey);

  const teams = await getSingleTeam(members.team_id);

  return ({ ...members, teams });
};

const viewTeamAndMembers = async (teamFirebaseKey) => {
  const team = await getSingleTeam(teamFirebaseKey);
  const teamMembers = await getTeamMembers(teamFirebaseKey);
  return { ...team, members: teamMembers };
};

export { getTeamAndMember, viewTeamAndMembers };
