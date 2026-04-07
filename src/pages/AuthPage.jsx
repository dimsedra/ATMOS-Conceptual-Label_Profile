import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AtmosTopNav from '../components/AtmosTopNav';
import SmoothReveal from '../components/SmoothReveal';
import './AuthPage.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      // Logic for transition would go here
    }, 1500);
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
                  <input type="email" required placeholder="your@email.com" />
                </div>
                <div className="input-group">
                  <label>SECURITY KEY</label>
                  <input type="password" required placeholder="••••••••" />
                </div>
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
                  <input type="text" required placeholder="your name" />
                </div>
                <div className="input-group">
                  <label>EMAIL IDENTIFIER</label>
                  <input type="email" required placeholder="your@email.com" />
                </div>
                <div className="input-group">
                  <label>SECURITY KEY</label>
                  <input type="password" required placeholder="create key" />
                </div>
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
