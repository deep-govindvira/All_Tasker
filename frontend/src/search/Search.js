import React from 'react';

const Search = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe 
        src="https://search-deep-govindvira.netlify.app/"
        title="Embedded Website"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
      />
    </div>
  );
};

export default Search;
