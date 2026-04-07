import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtmos } from '../context/AtmosContext';
import { products } from '../data/products';
import AtmosTopNav from '../components/AtmosTopNav';
import SmoothReveal from '../components/SmoothReveal';
import './ShopPage.css';

export default function ShopPage() {
  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
  }, []);

  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('atmos_view_mode');
    if (saved) return saved;
    // Default to 'list' for mobile viewports (<768px), 'grid' for others
    return window.innerWidth < 768 ? 'list' : 'grid';
  });
  const [filter, setFilter] = useState('ALL');
  const [sort, setSort] = useState('DEFAULT');
  const { addToBag } = useAtmos();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('atmos_view_mode', viewMode);
  }, [viewMode]);

  const filteredProducts = products
    .filter(p => filter === 'ALL' || p.category === filter)
    .sort((a, b) => {
      if (sort === 'PRICE_LOW') return a.price - b.price;
      if (sort === 'PRICE_HIGH') return b.price - a.price;
      return 0;
    });

  const handleAddToBag = (product) => {
    addToBag(product, 'M'); // Default size for quick add
  };

  return (
    <motion.div 
      className="shop-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <AtmosTopNav />
      
      <main className="shop-content">
        <header className="shop-header">
           <div className="header-meta">RETAIL REPOSITORY</div>
           <h1 className="shop-title">
             <SmoothReveal text="FUNCTIONAL WARES" delay={0.1} />
           </h1>

           <div className="shop-controls">
             <div className="category-filters">
               {['ALL', 'APPAREL', 'AUDIO'].map(cat => (
                 <button 
                   key={cat} 
                   className={`filter-btn ${filter === cat ? 'active' : ''}`}
                   onClick={() => setFilter(cat)}
                 >
                   {cat}
                 </button>
               ))}
             </div>
             <div className="sort-controls">
               <select onChange={(e) => setSort(e.target.value)} value={sort} className="sort-select">
                 <option value="DEFAULT">SORT: LATEST</option>
                 <option value="PRICE_LOW">PRICE: LOW-HIGH</option>
                 <option value="PRICE_HIGH">PRICE: HIGH-LOW</option>
               </select>
               <div className="view-controls">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} 
                  onClick={() => setViewMode('grid')}
                  title="GRID_VIEW"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </button>
                <button 
                  className={`view-btn ${viewMode === 'editorial' ? 'active' : ''}`} 
                  onClick={() => setViewMode('editorial')}
                  title="EDITORIAL_VIEW"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="7"></rect><rect x="3" y="14" width="18" height="7"></rect></svg>
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} 
                  onClick={() => setViewMode('list')}
                  title="LIST_VIEW"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                </button>
              </div>
            </div>
           </div>
        </header>

        <section className={`product-grid ${viewMode}`}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.id} 
                className="product-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="product-image-wrapper" onClick={() => navigate(`/shop/${product.id}`)}>
                  <motion.img 
                    src={product.img} 
                    alt={product.name} 
                    className="product-image" 
                    initial={{ filter: 'blur(15px)', opacity: 0 }}
                    animate={{ filter: 'blur(0px)', opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <div className="product-overlay">
                    <div className="overlay-content">
                      <button 
                        className="add-to-cart-btn"
                        onClick={(e) => { e.stopPropagation(); handleAddToBag(product); }}
                      >
                        ADD TO BAG
                      </button>
                      <span className="quick-look-tip">VIEW DETAILS</span>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-category-tag">{product.category}</div>
                  <h2 className="product-name">{product.name}</h2>
                  <div className="product-main-meta">
                    <span className="product-price">{product.priceStr}</span>
                    <span className="product-id">ID_{product.id}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>

    </motion.div>
  );
}
