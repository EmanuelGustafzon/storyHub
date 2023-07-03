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
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={registerFormData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={registerFormData.password} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={registerFormData.confirmPassword} onChange={handleChange} />
        </div>
        <button type="button" onClick={handleRegister}>Register</button>
        <Link href={'/account/login'}>Login</Link>
      </form>
    </div>
  );
};

export default RegisterPage;