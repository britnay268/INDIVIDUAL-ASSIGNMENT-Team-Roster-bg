import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getTeamMembers = (teamFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/teamMembers.json?orderBy="team_id"&equalTo="${teamFirebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
        // console.warn(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getTeamMembers;
