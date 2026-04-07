import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AtmosTopNav from '../components/AtmosTopNav';
import SmoothReveal from '../components/SmoothReveal';
import './CommunityEventsPage.css';

export default function CommunityEventsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'events';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [likes, setLikes] = useState({});
  const [reposts, setReposts] = useState({});
  const [isPosting, setIsPosting] = useState(false);
  const [postText, setPostText] = useState('');

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'events');
  }, [location.search]);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
  }, []);

  const toggleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleRepost = (id) => {
    setReposts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePost = () => {
    if (!postText.trim()) return;
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setPostText('');
      // Logic for adding post would go here
    }, 2000);
  };

  // Dummy Data for Threads-style feed
  const feedPosts = [
    { id: 1, author: "ATMOS_CORE", handle: "@atmos_sys", content: "The Seoul Sector pop-up was incredible. Thank you all for the energy. We are officially in sync.", time: "2H AGO" },
    { id: 2, author: "UNRAW", handle: "@unraw_official", content: "Working on the final vocal textures in the studio. The groove is starting to feel undeniable.", time: "5H AGO" },
    { id: 3, author: "USER_8991", handle: "@arch_dev", content: "Just received my Architectural Hoodie. The fit and silhouette stability are exactly what I needed.", time: "8H AGO" }
  ];

  const events = [
    { id: 1, name: "KINETIC OUTBREAK", date: "2026.05.14", loc: "SEOUL DISTRICT 1", status: "OPEN" },
    { id: 2, name: "UNRAW SYNC TOUR", date: "2026.08.22", loc: "TOKYO METRO", status: "SCHEDULED" },
    { id: 3, name: "SYSTEM OVERRIDE", date: "2026.11.02", loc: "GLOBAL STREAM", status: "TBA" }
  ];

  return (
    <motion.div 
      className="community-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AtmosTopNav />
      
      <div className="community-content">
        <header className="community-header">
           <div className="header-meta">COMMUNITY & EVENTS</div>
           <h1 className="header-title">
             <SmoothReveal 
               key={activeTab}
               text={activeTab === 'events' ? 'UPCOMING EVENTS' : 'THE COLLECTIVE'} 
               delay={0.1}
             />
           </h1>
           <div className="tab-controls">
             <button 
               className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
               onClick={() => setActiveTab('events')}
             >
               EVENTS
             </button>
             <button 
               className={`tab-btn ${activeTab === 'feed' ? 'active' : ''}`}
               onClick={() => setActiveTab('feed')}
             >
               COMMUNITIES
             </button>
           </div>
        </header>

        <div className="tab-body">
          <AnimatePresence mode="wait">
            {activeTab === 'events' ? (
              <motion.div 
                key="events"
                className="events-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {events.map((ev, i) => (
                  <div key={ev.id} className="event-card">
                    <div className="event-meta">
                      <span>DATE: {ev.date}</span>
                      <span>LOC: {ev.loc}</span>
                    </div>
                    <h2>{ev.name}</h2>
                    <div className={`event-status ${ev.status.toLowerCase()}`}>
                      STATUS: {ev.status}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="feed"
                className="feed-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="post-input-box">
                  <input 
                    type="text" 
                    placeholder={isPosting ? "ENCODING PERSPECTIVE..." : "Share your perspective..."} 
                    className="feed-input" 
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    disabled={isPosting}
                  />
                  <button className="feed-btn" onClick={handlePost} disabled={isPosting}>
                    {isPosting ? 'THINKING...' : 'POST'}
                  </button>
                </div>
                
                {feedPosts.map((post) => (
                  <div key={post.id} className="feed-post">
                    <div className="post-header">
                      <div className="post-author">{post.author} <span className="post-handle">{post.handle}</span></div>
                      <div className="post-time">{post.time}</div>
                    </div>
                    <p className="post-content">{post.content}</p>
                    <div className="post-actions">
                      <button 
                        className={`action-btn ${likes[post.id] ? 'active' : ''}`} 
                        onClick={() => toggleLike(post.id)}
                      >
                        {likes[post.id] ? 'SURFACEED' : 'LIKE'}
                      </button>
                      <button 
                        className={`action-btn ${reposts[post.id] ? 'active' : ''}`} 
                        onClick={() => toggleRepost(post.id)}
                      >
                        {reposts[post.id] ? 'SYNCED' : 'REPOST'}
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
