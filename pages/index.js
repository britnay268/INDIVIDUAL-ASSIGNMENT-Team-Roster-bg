import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '0 auto',
        color: 'darkviolet',
        fontFamily: 'cursive',
      }}
    >
      <h3>
        Hey {user.displayName}!
      </h3>
      <br />
      <div style={{ color: 'thistle' }}>
        <h4>Welcome to Game Night Festivities(GNF)!</h4>
        <p>Want to create teams for your next Game Night? Well, you are in the right place!!</p>
      </div>
    </div>
  );
}

export default Home;
