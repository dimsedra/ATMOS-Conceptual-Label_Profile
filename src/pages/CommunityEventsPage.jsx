import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabase } from '../context/SupabaseContext';
import ArchitecturalEditor from '../components/ArchitecturalEditor';
import AtmosTopNav from '../components/AtmosTopNav';
import SmoothReveal from '../components/SmoothReveal';
import './CommunityEventsPage.css';

export default function CommunityEventsPage() {
  const { supabase, user } = useSupabase();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTab = searchParams.get('tab') || 'events';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Post Creator State
  const [richContent, setRichContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPosting, setIsPosting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'events');
  }, [location.search]);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    fetchPosts();

    // REAL-TIME FEED SUBSCRIPTION
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
        // Optimistically fetch the new post with profile info
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (username, avatar_url)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('FETCH_STATE_FAIL:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5120000) { // 5MB Limit
      setSelectedImage(file);
    } else if (file) {
      alert('FILE_SIZE_LIMIT_EXCEEDED: 5MB MAX');
    }
  };

  const handlePost = async () => {
    if (!richContent.trim() && !selectedImage) return;
    if (!user) return alert('AUTHENTICATION_REQUIRED');

    setIsPosting(true);

    try {
      let imageUrl = null;

      // 1. UPLOAD IMAGE IF SELECTED
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('community_assets')
          .upload(filePath, selectedImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('community_assets')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrl;
      }

      // 2. INSERT POST
      const { error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          rich_html: richContent,
          image_url: imageUrl,
        });

      if (postError) throw postError;

      // 3. RESET STATE
      setRichContent('');
      setSelectedImage(null);
    } catch (err) {
      alert('SYNC_FAILURE: ' + err.message);
    } finally {
      setIsPosting(false);
    }
  };

  const toggleLike = async (postId) => {
    if (!user) return alert('AUTH_REQUIRED');
    // Implement resonant toggle logic here
  };

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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {user ? (
                   <div className="post-creator-unit">
                     <ArchitecturalEditor 
                       content={richContent} 
                       onChange={setRichContent} 
                       placeholder="ARCHITECTURE_OF_THOUGHT..."
                     />
                     <div className="creator-actions">
                       <input 
                         type="file" 
                         accept="image/*" 
                         ref={fileInputRef} 
                         onChange={handleImageSelect} 
                         style={{ display: 'none' }}
                       />
                       <button 
                         className={`unit-action ${selectedImage ? 'active' : ''}`}
                         onClick={() => fileInputRef.current.click()}
                         title="ADD_IMAGE"
                       >
                         {selectedImage ? 'IMAGE_STAGED' : 'ATTACH_MEDIA'}
                       </button>
                       <button 
                         className={`unit-submit ${isPosting ? 'loading' : ''}`}
                         onClick={handlePost}
                         disabled={isPosting}
                       >
                         {isPosting ? 'UPLOADING...' : 'PUBLISH'}
                       </button>
                     </div>
                   </div>
                ) : (
                  <div className="auth-prompt-unit">
                    AUTHENTICATION_REQUIRED_FOR_PARTICIPATION.
                  </div>
                )}
                
                {loading ? (
                  <div className="feed-status">SYNCHRONIZING_COLLECTIVE...</div>
                ) : (
                  <>
                    {posts.map((post) => (
                      <div key={post.id} className="feed-post-card">
                        <div className="post-header-unit">
                          <div className="member-alias">
                            {post.profiles?.avatar_url && <img src={post.profiles.avatar_url} className="mini-avatar" />}
                            {post.profiles?.username || 'ANONYMOUS_UNIT'}
                          </div>
                          <div className="post-time-stamp">
                            {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        
                        <div 
                          className="post-content-rich" 
                          dangerouslySetInnerHTML={{ __html: post.rich_html }} 
                        />
                        
                        {post.image_url && (
                          <div className="post-media-frame">
                            <img src={post.image_url} alt="Perspective Media" />
                          </div>
                        )}

                        <div className="post-actions-unit">
                          <button className="resonance-btn" onClick={() => toggleLike(post.id)}>
                            RESONATE
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
