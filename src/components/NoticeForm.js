import React, { useState } from 'react';
import '../styles/App.css';

const NoticeForm = ({ onAddNotice }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'academics',
    priority: 'medium',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }
    
    onAddNotice({
      ...formData,
      id: Date.now() // Generate unique ID
    });
    
    // Reset form
    setFormData({
      title: '',
      content: '',
      category: 'academics',
      priority: 'medium',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="notice-form">
      <h3>Add New Notice</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={formData.title}
          onChange={handleChange}
          className="form-input"
          required
        />
        
        <textarea
          name="content"
          placeholder="Notice Content"
          value={formData.content}
          onChange={handleChange}
          className="form-input"
          rows="3"
          required
        />
        
        <div className="form-row">
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            <option value="academics">Academics</option>
            <option value="events">Events</option>
            <option value="facilities">Facilities</option>
            <option value="projects">Projects</option>
          </select>
          
          <select 
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-select"
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Add Notice
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;
