import { getSingleMember } from './memberData';
import { getSingleTeam } from './teamData';
import getTeamMembers from './teamMemberData';

const getTeamAndMember = async (memberFirebaseKey) => {
  const members = await getSingleMember(memberFirebaseKey);

  const teams = await getSingleTeam(members.team_id);

  return ({ ...members, teams });
};

const viewTeamAndMembers = async (teamFirebaseKey) => {
  // Get Single Team
  const team = await getSingleTeam(teamFirebaseKey);
  // Get Team Members
  const teamMembers = await getTeamMembers(teamFirebaseKey);
  // Get Single Member in Team
  const members = await teamMembers.map((tm) => getSingleMember(tm.member_id));
  // Get all Member Objects
  const allMembersInTeam = await Promise.all(members);
  // Return the Team Object and Array of Members founf in Team Members
  // console.warn(teamMembers);
  // console.warn({ ...team, members: allMembersInTeam });
  return { ...team, members: allMembersInTeam };
};

export { getTeamAndMember, viewTeamAndMembers };
