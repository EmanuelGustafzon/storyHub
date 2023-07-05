import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  desc: string;
  newContributor: string;
  contributors: string[];
  isPublished: boolean;
}

const BlogPostPage: React.FC<{ apiUrl: string }> = ({ apiUrl }) => {
  const router = useRouter();
  const { id } = router.query;

  const [blogPost, setBlogPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get<Post>(`${apiUrl}/posts/${id}`);
        const postData = response.data;
        setBlogPost(postData);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id, apiUrl]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  const handleDeletePost = async () => {
    try {
      await axios.delete<Post>(`${apiUrl}/posts/${id}`)
      setBlogPost(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="row container">
        <div className="col-md-6">
          <div className="card bg-dark mb-3">
            <div className="card-body">
                <h2 className="card-title text-light">{blogPost.title}</h2>
              <p className="card-text text-secondary">{blogPost.desc}</p>
              <Link href={`/blog/`}className="btn btn-info text-light">back</Link>
            </div>
          </div>
        </div>
    </div>
    </>
  );
};

export default BlogPostPage;