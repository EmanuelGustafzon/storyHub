import HomePage from '../pages/HomePage';
import Navbar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';

const AppPage = () => {

  return (
    <div className='bg-light'>
    <Navbar/>
      <HomePage />
    </div>
  );
};

export default AppPage;



