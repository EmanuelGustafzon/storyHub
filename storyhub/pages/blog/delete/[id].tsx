import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const BlogPostDelete: React.FC<{ apiUrl: string }> = ({ apiUrl }) => {
  const router = useRouter();
  const { id } = router.query;

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/posts/${id}`, {
        withCredentials: true,
      });
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      <h1>Delete Blog Post</h1>
      <p>Are you sure you want to delete this blog post?</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
};

export default BlogPostDelete;