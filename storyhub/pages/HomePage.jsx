import React from 'react';
import Navbar from '../components/NavBar';
import Image from 'next/image';

const HomePage = ({ isLoggedIn }) => {
  return (
    <div>
    <div className="container text-center bold">
      <div className="row">
        <div className="col">
          <h1 className="mt-5 text-dark">Welcome to StoryHub</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="text-dark mt-5">
            Share your funniest and most fascinating personal tales on our blogging platform.
            From hilarious mishaps to extraordinary encounters, our community embraces all captivating narratives.
            Join us to connect with fellow storytellers, entertain an eager audience, and uncover a world of laughter and curiosity.
            Get ready to dive into StoryHub's treasure trove of personal stories that will leave you craving more.
            Unleash your inner storyteller today and let the hilarity and intrigue flow on StoryHub!
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default HomePage;
