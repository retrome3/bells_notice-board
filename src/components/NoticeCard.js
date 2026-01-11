import React from 'react';
import '../styles/App.css';

const NoticeCard = ({ notice, onDelete }) => {
  // Helper to get priority class
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className={`notice-card ${getPriorityClass(notice.priority)}`}>
      <button 
        className="delete-btn"
        onClick={() => onDelete(notice.id)}
        title="Delete notice"
        aria-label="Delete notice"
      >
        ×
      </button>
      
      <h3 className="notice-title">{notice.title}</h3>
      <p className="notice-content">{notice.content}</p>
      
      <div className="notice-footer">
        <div className="notice-meta">
          <span className="date-display">
            📅 {notice.date}
          </span>
          <span className={`priority-badge ${getPriorityClass(notice.priority)}`}>
            {notice.priority.toUpperCase()}
          </span>
          <span className="category-badge">
            {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
