import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
      <Helmet>
        <title>AssetVerse | 404 Error</title>
      </Helmet>

      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary mt-8 px-8">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
