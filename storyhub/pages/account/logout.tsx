import React from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';
import Navbar from '@/components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/router';

interface LogoutDataInterface {
  username: string;
  password: string;
}

interface LogoutPageProps {
  onLogout: () => void;
  apiUrl: string;
}

const LogoutPage: React.FC<LogoutPageProps> = ({ onLogout, apiUrl}) => {
  const router = useRouter()

const handleLogout = async () => {
  try {
    await axios.post(
      `${apiUrl}/accounts/logout`,
      {},
      { withCredentials: true }
    );
    onLogout()
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
    <div>
      <h1>Logout Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  );
};

export default LogoutPage;
