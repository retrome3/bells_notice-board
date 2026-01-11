import React, { useState, useEffect } from 'react';
import './styles/App.css';

// Import components
import Header from './components/Header';
import NoticeForm from './components/NoticeForm';
import NoticeCard from './components/NoticeCard';
import Controls from './components/Controls';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState('light');

  // THE "STOP PISSING ME OFF" MOBILE FORCE FIX
  useEffect(() => {
    // 1. Force the browser to stop zooming out
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

    // 2. Force a body class for mobile styling
    document.body.classList.add('mobile-ready');

    // 3. Theme logic
    const savedTheme = localStorage.getItem('bells-theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('bells-theme', newTheme);
  };

  // Notices Logic
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('bells-notices');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Welcome to Bells University',
        content: 'This is the digital notice board. Use the form below to add updates.',
        category: 'academics',
        priority: 'medium',
        date: new Date().toISOString().split('T')[0]
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const addNotice = (newNotice) => {
    setNotices([newNotice, ...notices]);
  };

  const deleteNotice = (id) => {
    if (window.confirm('Delete this notice?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="app">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      
      <Header />
      
      <main className="container">
        {/* On Mobile, these stack. On Desktop, they use the grid in App.css */}
        <div className="main-layout">
          
          <div className="sidebar left-panel">
            <NoticeForm onAddNotice={addNotice} />
          </div>
          
          <div className="main-content">
            <Controls 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            
            <div className="notice-grid">
              {filteredNotices.length === 0 ? (
                <div className="empty-msg">No notices found.</div>
              ) : (
                filteredNotices.map(n => (
                  <NoticeCard key={n.id} notice={n} onDelete={deleteNotice} />
                ))
              )}
            </div>
          </div>

          <div className="sidebar right-panel">
            <div className="stats-box">
              <h3>Stats</h3>
              <p>Total: {notices.length}</p>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
