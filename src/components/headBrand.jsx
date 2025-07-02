import React from 'react';
import CintilloAyacucho from '../assets/CintilloAyacucho.png';

const HeadBrand = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      maxWidth: '100vw',
      overflow: 'hidden',
      background: '#fff',
      margin: 0,
      padding: 0,
      zIndex: 1000,
      boxSizing: 'border-box',
      height: 'auto'
    }}>
      <img 
        src={CintilloAyacucho} 
        alt="Cintillo Ayacucho" 
        style={{ width: '100vw', maxWidth: '100vw', height: 'auto', objectFit: 'cover', display: 'block', margin: 0, padding: 0, boxSizing: 'border-box' }}
      />
    </header>
  );
};

export default HeadBrand;
