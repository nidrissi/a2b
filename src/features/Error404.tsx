import React from "react";

/** A generic 404 error */
const Error404: React.FC<{}> = () => {
  return (
    <div className="w-full h-48 rounded-xl bg-gray-300 flex">
      <h1 className="text-5xl mx-auto my-auto">404 Not found</h1>
    </div>
  );
};

export default Error404;
