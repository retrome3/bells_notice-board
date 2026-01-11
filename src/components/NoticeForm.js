import React, { useState } from 'react';
import '../styles/App.css';

const NoticeForm = ({ onAddNotice }) => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'academics',
    priority: 'medium',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    
    onAddNotice({
      ...form,
      id: Date.now()
    });
    
    setForm({
      title: '',
      content: '',
      category: 'academics',
      priority: 'medium',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="notice-form">
      <h3>📝 Add New Notice</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Notice Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        
        <textarea
          name="content"
          placeholder="Notice Content"
          value={form.content}
          onChange={handleChange}
          rows="3"
          required
        />
        
        <div className="form-row">
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="academics">Academics</option>
            <option value="events">Events</option>
            <option value="facilities">Facilities</option>
            <option value="projects">Projects</option>
          </select>
          
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        
        <button type="submit">
          Add Notice
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;
