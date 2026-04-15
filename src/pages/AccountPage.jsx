import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabase } from '../context/SupabaseContext';
import AtmosTopNav from '../components/AtmosTopNav';
import './AccountPage.css';

export default function AccountPage() {
  const { supabase, user } = useSupabase();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ username: '', avatar_url: '' });

  // Update Settings State
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  
  const [avatarUploading, setAvatarUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    
    if (!user) {
      navigate('/auth');
    } else {
      fetchProfile();
    }
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (data) {
        setProfile(data);
      } else {
        // Fallback if no profile is found but auth exists
        setProfile({ username: user.user_metadata?.username || 'ANONYMOUS', avatar_url: '' });
      }
    } catch (err) {
      console.error('FETCH_PROFILE_ERROR:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordStatus('ERR: TOO_SHORT (MIN_6)');
      return;
    }

    setPasswordStatus('UPDATING...');
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      setPasswordStatus('ERR: ' + error.message.toUpperCase());
    } else {
      setPasswordStatus('SUCCESS: SECURITY_KEY_UPDATED');
      setNewPassword('');
      setTimeout(() => setPasswordStatus(''), 4000);
    }
  };

  const handleAvatarUpload = async (e) => {
    try {
      setAvatarUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
         // Create bucket dynamically if it doesn't exist? Normally buckets form via dashboard.
         throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Upsert to profiles
      const { error: updateError } = await supabase.from('profiles').upsert({
        id: user.id,
        username: profile.username || user.user_metadata?.username || 'user',
        avatar_url: publicUrl,
        updated_at: new Date()
      });

      if (updateError) throw updateError;
      
      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      alert('AVATAR_UPLOAD_SUCCESS');
      
    } catch (error) {
      alert('UPLOAD_ERROR: ' + error.message);
    } finally {
      setAvatarUploading(false);
    }
  };

  if (!user || loading) return (
    <div className="account-container"><div className="loading-sys">INITIALIZING_PROFILE...</div></div>
  );

  const displayAlias = profile.username || user.user_metadata?.username || user.user_metadata?.full_name || 'USER';

  return (
    <motion.div 
      className="account-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AtmosTopNav />
      
      <div className="account-studio">
        <div className="studio-header split-header">
           <div className="header-meta">
              <div className="studio-tag">SYSTEM PROFILE</div>
              <h2 className="profile-identity">ID: {displayAlias}</h2>
           </div>
           
           <div className="avatar-section">
              <div 
                className={`avatar-frame ${avatarUploading ? 'uploading' : ''}`}
                onClick={() => fileInputRef.current?.click()}
              >
                 {profile.avatar_url ? (
                   <img src={profile.avatar_url} alt="Profile Avatar" className="avatar-img" />
                 ) : (
                   <div className="avatar-placeholder">NO_MEDIA</div>
                 )}
                 <div className="avatar-overlay">{avatarUploading ? 'SYNC...' : 'EDIT'}</div>
              </div>
              <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleAvatarUpload} 
                 accept="image/*" 
                 style={{ display: 'none' }} 
              />
           </div>
        </div>

        <div className="terminal-body settings-body">
           <div className="settings-section">
             <div className="settings-label">CREDENTIALS</div>
             <div className="info-row">
               <span className="info-key">EMAIL</span>
               <span className="info-val">{user.email}</span>
             </div>
             <div className="info-row">
               <span className="info-key">USER_ID</span>
               <span className="info-val">{user.id.split('-')[0]}***</span>
             </div>
           </div>

           <div className="settings-section">
             <div className="settings-label">SECURITY PROTOCOL</div>
             <form className="password-form" onSubmit={handlePasswordUpdate}>
               <div className="input-group">
                 <input 
                   type="password" 
                   value={newPassword}
                   onChange={(e) => setNewPassword(e.target.value)}
                   placeholder="NEW SECURITY KEY (MIN 6 CHARS)"
                   required
                 />
               </div>
               <button type="submit" className="unit-submit password-submit">UPDATE KEY</button>
             </form>
             <AnimatePresence>
                {passwordStatus && (
                  <motion.div 
                    className="auth-error-console status-console"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {passwordStatus}
                  </motion.div>
                )}
             </AnimatePresence>
           </div>
           
           <div className="settings-section danger-zone">
              <button className="unit-submit logout-submit" onClick={handleLogout}>
                TERMINATE SESSION [ LOG OUT ]
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
