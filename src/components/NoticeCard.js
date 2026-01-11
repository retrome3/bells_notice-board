import React from 'react';
import '../styles/App.css';

const NoticeCard = ({ notice, onDelete }) => {
  const priorityColors = {
    high: { bg: '#fee2e2', text: '#991b1b', darkBg: '#7f1d1d', darkText: '#fecaca' },
    medium: { bg: '#fef3c7', text: '#92400e', darkBg: '#92400e', darkText: '#fef3c7' },
    low: { bg: '#d1fae5', text: '#065f46', darkBg: '#065f46', darkText: '#d1fae5' }
  };

  const categoryColors = {
    academics: { bg: '#dbeafe', text: '#1e40af', darkBg: '#1e40af', darkText: '#dbeafe' },
    events: { bg: '#fef3c7', text: '#92400e', darkBg: '#92400e', darkText: '#fef3c7' },
    facilities: { bg: '#d1fae5', text: '#065f46', darkBg: '#065f46', darkText: '#d1fae5' },
    projects: { bg: '#e9d5ff', text: '#7c3aed', darkBg: '#7c3aed', darkText: '#e9d5ff' }
  };

  return (
    <div className="notice-card">
      <button 
        className="delete-btn"
        onClick={() => onDelete(notice.id)}
        aria-label="Delete notice"
      >
        ×
      </button>
      
      <h3 className="notice-title">{notice.title}</h3>
      <p className="notice-content">{notice.content}</p>
      
      <div className="notice-footer">
        <div className="notice-meta">
          <span className="date">📅 {notice.date}</span>
          <span 
            className="priority-badge"
            style={{
              backgroundColor: priorityColors[notice.priority]?.bg,
              color: priorityColors[notice.priority]?.text
            }}
          >
            {notice.priority.toUpperCase()}
          </span>
          <span 
            className="category-badge"
            style={{
              backgroundColor: categoryColors[notice.category]?.bg,
              color: categoryColors[notice.category]?.text
            }}
          >
            {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
