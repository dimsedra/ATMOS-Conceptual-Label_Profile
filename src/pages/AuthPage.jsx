import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupabase } from '../context/SupabaseContext';
import AtmosTopNav from '../components/AtmosTopNav';
import SmoothReveal from '../components/SmoothReveal';
import './AuthPage.css';

export default function AuthPage() {
  const { supabase, user } = useSupabase();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
    // If already logged in, redirect
    if (user) navigate('/');
  }, [user, navigate]);

  const validateInputs = () => {
    if (!email.includes('@')) return 'INVALID_EMAIL_FORMAT';
    if (password.length < 6) return 'SECURITY_KEY_TOO_SHORT_MIN_6';
    if (!isLogin && !username.trim()) return 'USER_ALIAS_REQUIRED';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsAuthenticating(true);

    try {
      if (isLogin) {
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (loginError) throw loginError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: username.trim(),
              username: username.trim().toLowerCase().replace(/\s+/g, '_'),
            },
          },
        });
        if (signUpError) throw signUpError;
        // Supabase might require email confirmation, alert user
        setError('CHECK_EMAIL_FOR_CONFIRMATION');
      }
    } catch (err) {
      setError(err.message.toUpperCase().replace(/\s+/g, '_'));
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <motion.div 
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AtmosTopNav />
      
      <div className="auth-studio">
        <div className="studio-header">
           <div className="studio-tag">MEMBERSHIP ACCESS</div>
           <div className="studio-tabs">
             <button 
               className={`studio-tab ${isLogin ? 'active' : ''}`} 
               onClick={() => setIsLogin(true)}
             >
               SIGN IN
             </button>
             <button 
               className={`studio-tab ${!isLogin ? 'active' : ''}`} 
               onClick={() => setIsLogin(false)}
             >
               JOIN US
             </button>
           </div>
        </div>

        <div className="terminal-body">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form 
                key="login"
                className="auth-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                <div className="input-group">
                  <label>EMAIL IDENTIFIER</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>SECURITY KEY</label>
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <motion.div 
                    className="auth-error-console"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <span className="error-prefix">ERR_STATE:</span> {error}
                  </motion.div>
                )}

                <button type="submit" className={`studio-submit ${isAuthenticating ? 'loading' : ''}`} disabled={isAuthenticating}>
                  {isAuthenticating ? 'AUTHENTICATING_SYS...' : 'INITIATE ACCESS'}
                </button>
              </motion.form>
            ) : (
              <motion.form 
                key="register"
                className="auth-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                <div className="input-group">
                  <label>USER ALIAS</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="your name" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>EMAIL IDENTIFIER</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>SECURITY KEY</label>
                  <input 
                    type="password" 
                    required 
                    placeholder="create key" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <motion.div 
                    className="auth-error-console"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <span className="error-prefix">ERR_STATE:</span> {error}
                  </motion.div>
                )}

                <button type="submit" className={`studio-submit ${isAuthenticating ? 'loading' : ''}`} disabled={isAuthenticating}>
                  {isAuthenticating ? 'GENERATING PROFILE...' : 'CREATE PROFILE'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
        
      </div>
    </motion.div>
  );
}
