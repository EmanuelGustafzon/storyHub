import { useEffect, useState } from 'react';
import axios from 'axios'
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.css';

interface Post {
  _id: string;
  title: string;
  desc: string;
  newContributor: string;
  contributors: string[];
  isPublished: boolean;
}

const BlogIndex: React.FC<{ apiUrl: string }> = ({ apiUrl }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(`${apiUrl}/posts`);
        const postData = response.data;
        setPosts(postData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [apiUrl]);

  return (
    <>
    <div className="row">
      {posts?.map((post) => (
        <div key={post._id} className="col-md-4">
          <div className="card bg-dark mb-3">
            <div className="card-body">
                <h5 className="card-title text-light">{post.title}</h5>
              <p className="card-text text-secondary">{post.desc.split('.').slice(0, 3).join('.')}</p>
              <Link href={`/blog/${post._id}`}className="btn btn-info text-light">Read more</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default BlogIndex;