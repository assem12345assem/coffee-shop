import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    alert(`Search for: ${query}`);
  };

  return (
    <div className="flex-1 w-full max-w-xs sm:max-w-md md:max-w-lg">
      <input
        type="text"
        placeholder="Search our site..."
        className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-brown text-white px-4 py-2 rounded-r-md hover:bg-gray-700">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
