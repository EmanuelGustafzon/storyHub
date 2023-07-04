import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Router, useRouter } from 'next/router';

interface UpdateProfileForm {
  oldUsername: string;
  oldPassword: string;
  newUsername: string;
  newPassword: string;
  repeatNewPassword: string;
}

interface LogoutPageProps {
  onLogout: () => void;
  apiUrl: string;
}

const UpdateAccount: React.FC<LogoutPageProps> = ({ apiUrl, onLogout })=> {
  const router = useRouter()
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState<UpdateProfileForm>({
    oldUsername: '',
    oldPassword: '',
    newUsername: '',
    newPassword: '',
    repeatNewPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${apiUrl}/accounts/profile/update`, updateFormData, {withCredentials: true});
      router.push('/profile')
    } catch (error) {
      console.error(error);
      // Show error message or handle the error
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await axios.delete(`${apiUrl}/accounts/profile/delete`, { withCredentials: true });
      router.push('/blog');
      onLogout()
    } catch (error) {
      console.error(error);
      // Show error message or handle the error
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div>
        <h1 className="mb-4">Update Profile</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="oldUsername" className="form-label">Old Username:</label>
            <input type="text" id="oldUsername" name="oldUsername" onChange={handleChange} className="form-control" />
          </div>
  
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">Old Password:</label>
            <input type="password" id="oldPassword" name="oldPassword" onChange={handleChange} className="form-control" />
          </div>
  
          <div className="mb-3">
            <label htmlFor="newUsername" className="form-label">New Username:</label>
            <input type="text" id="newUsername" name="newUsername" onChange={handleChange} className="form-control" />
          </div>
  
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password:</label>
            <input type="password" id="newPassword" name="newPassword" onChange={handleChange} className="form-control" />
          </div>
  
          <div className="mb-3">
            <label htmlFor="repeatNewPassword" className="form-label">Repeat New Password:</label>
            <input type="password" id="repeatNewPassword" name="repeatNewPassword" onChange={handleChange} className="form-control" />
          </div>
  
          <button type="button" onClick={handleUpdateProfile} className="btn btn-primary">
            Update Profile
          </button>
        </form>
  
        <button type="button" onClick={handleDeleteAccount} className="btn btn-danger mt-3">
          Delete Account
        </button>
      </div>
  
      {showDeleteModal && (
        <div className="mt-3">
          <button type="button" className="btn btn-secondary me-2" onClick={cancelDeleteAccount}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={confirmDeleteAccount}>
            Delete
          </button>
        </div>
      )}
    </>
  );
};

export default UpdateAccount;
