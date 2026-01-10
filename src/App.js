import React, { useState, useEffect } from 'react';
import './styles/App.css';

// Import components
import Header from './components/Header';
import NoticeForm from './components/NoticeForm';
import NoticeCard from './components/NoticeCard';
import Controls from './components/Controls';
import Footer from './components/Footer';

function App() {
  // Theme state
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('bells-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('bells-theme', newTheme);
  };

  // Load from localStorage or use initial data
  const loadNotices = () => {
    const saved = localStorage.getItem('bells-notices');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 1,
        title: 'Mid-Term Exams Schedule',
        content: 'Mid-term examinations for all 200-level courses will commence from November 15, 2025. Check your department notice board for detailed timetable.',
        category: 'academics',
        date: '2025-11-01',
        priority: 'high'
      },
      {
        id: 2,
        title: 'ICT 235 Project Submission Deadline',
        content: 'The deadline for submitting the Frontend Development project is November 30, 2025. Ensure your GitHub repository is properly set up.',
        category: 'projects',
        date: '2025-11-05',
        priority: 'high'
      },
      {
        id: 3,
        title: 'University Sports Week',
        content: 'Annual sports competition begins next week. Register at the sports office before Friday.',
        category: 'events',
        date: '2025-11-03',
        priority: 'medium'
      },
      {
        id: 4,
        title: 'Library Renovation',
        content: 'The main library will be closed for renovation from November 10-17, 2025. E-library services will remain accessible online.',
        category: 'facilities',
        date: '2025-11-02',
        priority: 'medium'
      },
      {
        id: 5,
        title: 'Student Union Meeting',
        content: 'Monthly student union meeting scheduled for November 8, 2025 at 3 PM in the main auditorium.',
        category: 'events',
        date: '2025-11-01',
        priority: 'low'
      },
      {
        id: 6,
        title: 'Course Registration Extension',
        content: 'The course registration deadline has been extended to November 12, 2025. Complete your registration before this date.',
        category: 'academics',
        date: '2025-11-06',
        priority: 'high'
      }
    ];
  };

  const [notices, setNotices] = useState(loadNotices());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Save to localStorage whenever notices change
  useEffect(() => {
    localStorage.setItem('bells-notices', JSON.stringify(notices));
  }, [notices]);

  // Add new notice
  const addNotice = (newNotice) => {
    setNotices([newNotice, ...notices]);
  };

  // Delete notice
  const deleteNotice = (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(notice => notice.id !== id));
    }
  };

  // Filter notices based on search and category
  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container">
      {/* Theme Toggle Button */}
      <div className="theme-toggle">
        <button 
          className="theme-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
      
      <Header />
      
      <div className="main-layout">
        {/* Left sidebar for adding notices */}
        <div className="sidebar">
          <NoticeForm onAddNotice={addNotice} />
          <div className="stats">
            <h3>Notice Board Stats</h3>
            <p>Total Notices: <strong>{notices.length}</strong></p>
            <p>Filtered: <strong>{filteredNotices.length}</strong></p>
            <p>Theme: <strong>{theme === 'light' ? 'Light ☀️' : 'Dark 🌙'}</strong></p>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="main-content">
          <Controls 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          
          <div className="notice-grid">
            {filteredNotices.length === 0 ? (
              <div className="no-notices">
                <p>No notices found. Try a different search or category, or add a new notice!</p>
              </div>
            ) : (
              filteredNotices.map(notice => (
                <NoticeCard 
                  key={notice.id} 
                  notice={notice} 
                  onDelete={deleteNotice}
                />
              ))
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;