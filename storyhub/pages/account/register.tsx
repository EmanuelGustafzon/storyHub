import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface RegisterForm {
  username: string;
  password: string;
  confirmPassword: string;
}
interface RegisterPageProps {
  apiUrl: string;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ apiUrl }) => {
  const router = useRouter();

  const [registerFormData, setRegisterFormData] = useState<RegisterForm>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${apiUrl}/accounts/register`, registerFormData);
      router.push('/account/login')   
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container'>
      <h1>Register</h1>
    <form>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={registerFormData.username}
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
          value={registerFormData.password}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={registerFormData.confirmPassword}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="button" onClick={handleRegister} className="btn btn-primary">
        Register
      </button>
      <Link href="/account/login" className="btn btn-link">Login</Link>
    </form>
    </div>
  );
};

export default RegisterPage;