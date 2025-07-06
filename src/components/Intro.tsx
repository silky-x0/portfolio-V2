import React from 'react';

const Intro: React.FC = () => {
  return (
      <>
      <div className='svg flex justify-center items-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden'>
          <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="hiMask">
      <rect width="400" height="200" fill="white"/>
  
      <text x="200" y="120" font-family="system-ui, -apple-system, sans-serif" font-size="80" font-weight="300" text-anchor="middle" fill="black">Hi</text>
    </mask>
  </defs>
  
  <rect width="400" height="200" fill="#000000"/>
  
  <rect width="400" height="200" fill="black" mask="url(#hiMask)"/>
</svg>
      </div>
      </>
  );
};

export default Intro;