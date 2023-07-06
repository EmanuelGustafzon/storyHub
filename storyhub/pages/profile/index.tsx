import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';

interface Post {
  title: string;
  desc: string;
  _id: string;
}
interface Profile {
    username: string;
    posts: Post[];
    title: string;
    desc: string;
    _id: string;
  }


const ProfilePage: React.FC<{ apiUrl: string; isLoggedIn: boolean  }> = ({ apiUrl, isLoggedIn  }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get<Profile>(`${apiUrl}/accounts/profile`, {
          withCredentials: true,
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData()
    }
  }, [apiUrl, isLoggedIn, router]);

  

  if (!profile || !profile.posts) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <div className='container'>
      <h2>Welcome {profile.username}!</h2>
      <hr />
      <Link href={`/profile/updateAccount`}className="btn btn-info text-light"> Account settings </Link>
      <Link href={`/blog/create`}className="btn btn-info text-light"> Create new post </Link>
      <hr />
      <h3>Your Posts:</h3>
      <div className="row">
      {profile?.posts?.map((post) => (
        <div key={post._id} className="col-md-4">
          <div className="card bg-dark mb-3">
            <div className="card-body">
                <h5 className="card-title text-light">{post.title}</h5>
              <p className="card-text text-secondary">{post.desc.split('.').slice(0, 3).join('.')}</p>
              <Link href={`/profile/blog/${post._id}`}className="btn btn-info text-light">Details</Link>
              <Link href={`/blog/edit/${post._id}`}className="btn btn-success text-light">update</Link>
              <Link href={`/blog/delete/${post._id}`}className="btn btn-danger text-light">Delete</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
    </>
  );
};

export default ProfilePage;