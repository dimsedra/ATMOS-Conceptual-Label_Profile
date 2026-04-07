import { motion, AnimatePresence } from 'framer-motion';
import { useAtmos } from '../context/AtmosContext';
import './AtmosBagSidebar.css';

export default function AtmosBagSidebar() {
  const { bagItems, removeFromBag, isBagOpen, setIsBagOpen } = useAtmos();

  const subtotal = bagItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <AnimatePresence>
      {isBagOpen && (
        <>
          <motion.div 
            className="bag-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBagOpen(false)}
          />
          <motion.aside 
            className="bag-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="bag-header">
              <div className="bag-title">SHOPPING BAG [{bagItems.length}]</div>
              <button className="bag-close" onClick={() => setIsBagOpen(false)}>✕</button>
            </div>

            <div className="bag-items">
              {bagItems.length === 0 ? (
                <div className="bag-empty">YOUR BAG IS CURRENTLY EMPTY.</div>
              ) : (
                bagItems.map((item) => (
                  <div key={item.bagId} className="bag-item">
                    <div className="item-img">
                      <img src={item.img} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <div className="item-top">
                        <span className="item-name">{item.name}</span>
                        <button className="item-remove" onClick={() => removeFromBag(item.bagId)}>✕</button>
                      </div>
                      <div className="item-meta">SIZE: {item.size}</div>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bag-footer">
              <div className="bag-subtotal">
                <span>SUBTOTAL</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className="bag-checkout-btn" disabled={bagItems.length === 0}>
                CHECKOUT SYSTEM
              </button>
              <div className="bag-footer-note">ATMOS_SYS // SECURE ENCRYPTION ENABLED</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
