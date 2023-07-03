import React from 'react';
import Navbar from '../components/NavBar';
import Image from 'next/image';

const HomePage = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn && <Navbar />}
      <div>Hello, world! This is the home page.</div>
      <div className="container text-center bg-dark">
        <div className="row align-items-start">
          <div className="col text-light pt-3">
            Welcome to StoryHub, where laughter and intrigue intertwine. Share your funniest and most fascinating personal tales on our blogging platform. 
            From hilarious mishaps to extraordinary encounters, our community embraces all captivating narratives. 
            Join us to connect with fellow storytellers, entertain an eager audience, and uncover a world of laughter and curiosity. 
            Get ready to dive into StoryHubs treasure trove of personal stories that will leave you craving more. 
            Unleash your inner storyteller today and let the hilarity and intrigue flow on StoryHub!
            </div>
          <div className="col">
            <Image src="/tree.jpg" alt="My Image" width={500} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
