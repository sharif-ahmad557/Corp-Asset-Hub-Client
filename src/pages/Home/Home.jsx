import React from "react";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <Helmet>
        <title>AssetVerse | Home</title>
      </Helmet>
      <h1 className="text-5xl font-bold text-primary animate-bounce">
        AssetVerse
      </h1>
      <p className="text-xl">Your Ultimate Asset Management Solution</p>
      <button className="btn btn-secondary">Explore Now</button>
    </div>
  );
};

export default Home;
