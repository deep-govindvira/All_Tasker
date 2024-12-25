import React from 'react';

const Code = () => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe 
        src="https://cppeditor.netlify.app/"
        title="CPP Editor"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allowFullScreen
      />
    </div>
  );
};

export default Code;
