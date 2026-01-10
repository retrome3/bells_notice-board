import React from 'react';
import '../styles/App.css';

const NoticeCard = ({ notice, onDelete }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      default: return '#44aa44';
    }
  };

  return (
    <div className="notice-card">
      <button 
        className="delete-btn"
        onClick={() => onDelete(notice.id)}
        title="Delete notice"
      >
        ×
      </button>
      <h3 className="notice-title">{notice.title}</h3>
      <p className="notice-content">{notice.content}</p>
      <div className="notice-footer">
        <span>📅 {notice.date}</span>
        <span style={{
          background: getPriorityColor(notice.priority),
          color: 'white',
          padding: '3px 10px',
          borderRadius: '10px',
          fontSize: '12px'
        }}>
          {notice.priority.toUpperCase()}
        </span>
        <span>🏷️ {notice.category}</span>
      </div>
    </div>
  );
};

export default NoticeCard;
