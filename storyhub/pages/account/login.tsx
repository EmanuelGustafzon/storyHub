import React, { useState, ChangeEvent, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LoginDataInterface {
  username: string;
  password: string;
}


const LoginForm = ({ onLogin, apiUrl }: { onLogin: () => void , apiUrl: string}) => {
  const [loginData, setLoginData] = useState<LoginDataInterface>({
    username: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIsLogginIn, setUserIsLogginIn] = useState(false); 
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${apiUrl}/accounts/login`, loginData, { withCredentials: true });
      console.log('Response:', response.data);

      if (response.data && response.data.message) {
        const { message } = response.data;
        console.log('Message:', message);
        setUserIsLogginIn(true); 
        onLogin()
      } else {
        console.log('Invalid response data:', response.data);
      }
    } catch (error) {
      console.error(error);
    }
    setIsSubmitting(false);
  };


  useEffect(() => {
    if (userIsLogginIn) {
      router.push('/profile'); 
    }
  }, [userIsLogginIn, router]);

  return (
    <>
       (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        Login
      </button>
      <Link href="/account/register" className="btn btn-link">Register</Link>
    </form>
    </>
  );
};

export default LoginForm;