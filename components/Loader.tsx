// components/Loader.jsx
import React from 'react';
import { DNA } from 'react-loader-spinner'; // Ensure this path matches your installed package

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
