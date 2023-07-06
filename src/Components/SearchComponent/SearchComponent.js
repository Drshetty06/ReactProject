import React from 'react';
import './SearchComponent.css'; 

const SearchComponent = ({ onSearch }) => {
  const handleSearch = () => {
   
  };

  return (
    <div className="search-container">
      <input id="searchInput" type="text" placeholder="Role or Permission" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchComponent;
