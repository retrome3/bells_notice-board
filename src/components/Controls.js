import React from 'react';
import '../styles/App.css';

const Controls = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const categories = [
    { id: 'all', label: 'All Notices' },
    { id: 'academics', label: 'Academics' },
    { id: 'events', label: 'Events' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'projects', label: 'Projects' }
  ];

  return (
    <div className="controls">
      <input 
        type="text"
        className="search-input"
        placeholder="🔍 Search notices..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
