import React from 'react';
import './ButtonComponent.css'; 

const ButtonComponent = ({ onClick, children }) => {
  return (
    <button className="common-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
