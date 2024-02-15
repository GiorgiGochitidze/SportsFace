// Home.jsx
import { useParams } from 'react-router-dom';
import UserNavBar from './UserNavBar';

const Home = () => {
  // Extracting userName and surName from the route parameters
  const { userName, surName } = useParams();

  return ( 
    <>
    <UserNavBar />
    <div>
      <p>Welcome, User {userName} {surName}!</p>
    </div>
    </>
  );
}

export default Home;
