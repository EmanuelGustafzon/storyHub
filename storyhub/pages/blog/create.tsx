import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/router';

interface PostCreate {
  title: string;
  desc: string;
  contributors: string[];
  newContributor: string;
  isPublished: boolean;
}

const CreatePost: React.FC<{ apiUrl: string }> = ({ apiUrl }) => {

  const router = useRouter()

  const [postData, setPostData] = useState<PostCreate>({
    title: '',
    desc: '',
    contributors: [],
    isPublished: false,
    newContributor: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddContributor = () => {
    const { newContributor } = postData;
    if (newContributor.trim() !== '') {
      setPostData((prevState) => ({
        ...prevState,
        contributors: [...prevState.contributors, newContributor.trim()],
        newContributor: '',
      }));
    }
  };

  const handleRemoveContributor = (index: number) => {
    setPostData((prevState) => {
      const updatedContributors = [...prevState.contributors];
      updatedContributors.splice(index, 1);
      return {
        ...prevState,
        contributors: updatedContributors,
      };
    });
  };

  const handlePublishToggle = () => {
    setPostData((prevState) => ({
      ...prevState,
      isPublished: !prevState.isPublished,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/posts/create`,
        postData,
        { withCredentials: true }
      );
      console.log(response.data);
      router.push('/profile')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={postData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="desc">Description/Content:</label>
        <textarea
          id="desc"
          name="desc"
          value={postData.desc}
          onChange={handleChange}
          style={{ whiteSpace: 'pre-line' }}
        />
      </div>
      <div>
        <label htmlFor="newContributor">Contributors:</label>
        <input
          type="text"
          id="newContributor"
          name="newContributor"
          value={postData.newContributor}
          onChange={handleChange}
        />
        <button type="button" onClick={handleAddContributor}>
          Add
        </button>
      </div>
      <div>
        <h4>Current Contributors:</h4>
        <ul>
          {postData.contributors.map((contributor, index) => (
            <li key={index}>
              <span>{contributor}</span>
              <button type="button" onClick={() => handleRemoveContributor(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label htmlFor="isPublished">Publish:</label>
        <input
          type="checkbox"
          id="isPublished"
          name="isPublished"
          checked={postData.isPublished}
          onChange={handlePublishToggle}
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
    </>
  );
};

export default CreatePost;