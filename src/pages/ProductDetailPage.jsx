import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtmos } from '../context/AtmosContext';
import { products } from '../data/products';
import AtmosTopNav from '../components/AtmosTopNav';
import SmoothReveal from '../components/SmoothReveal';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToBag } = useAtmos();
  const [selectedSize, setSelectedSize] = useState('M');

  const product = products.find(p => p.id === parseInt(id));
  const relatedProducts = products.filter(p => p.id !== parseInt(id)).slice(0, 3);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
  }, [id]);

  if (!product) return <div className="product-not-found">PRODUCT_NOT_IDENTIFIED</div>;

  return (
    <motion.div 
      className="product-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AtmosTopNav />
      
      <main className="product-detail-content">
        <div className="detail-top-nav">
          <button className="back-btn" onClick={() => navigate('/shop')}>
            <span className="back-arrow">←</span>
            <span className="back-text">BACK_TO_REPOSITORY</span>
            <div className="back-hover-line"></div>
          </button>
        </div>

        <div className="product-main-grid">
          {/* Column 1: Heavy Visuals */}
          <div className="product-visuals">
            <motion.div 
              className="main-image-wrapper"
              initial={{ filter: 'blur(20px)', opacity: 0, scale: 1.1 }}
              animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={product.img} alt={product.name} />
            </motion.div>
          </div>

          {/* Column 2: Architectural Specs */}
          <div className="product-specs-sidebar">
             <div className="specs-sticky">
                <div className="specs-header">
                  <div className="specs-category">{product.category} // ID_{product.id}</div>
                  <h1 className="specs-title">
                    <SmoothReveal text={product.name} delay={0.1} />
                  </h1>
                  <div className="specs-price">{product.priceStr}</div>
                </div>

                <p className="specs-mandate">{product.mandate}</p>

                <div className="specs-options">
                   <div className="option-row">
                      <span className="option-label">SELECT_SIZE</span>
                      <div className="detail-size-selector">
                        {['S', 'M', 'L', 'XL'].map(sz => (
                          <button 
                            key={sz} 
                            className={`detail-size-btn ${selectedSize === sz ? 'active' : ''}`}
                            onClick={() => setSelectedSize(sz)}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                   </div>
                </div>

                <button className="specs-add-btn" onClick={() => addToBag(product, selectedSize)}>
                  ADD_TO_BAG_SYSTEM
                </button>

                <div className="specs-technical">
                   <div className="tech-row">
                     <span className="tech-label">MATERIAL</span>
                     <span className="tech-value">{product.details.material}</span>
                   </div>
                   <div className="tech-row">
                     <span className="tech-label">SIZING</span>
                     <span className="tech-value">{product.details.sizing}</span>
                   </div>
                   <div className="tech-row">
                     <span className="tech-label">CARE</span>
                     <span className="tech-value">{product.details.care}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="related-section">
           <div className="related-header">
             <div className="related-tag">CONTINUING THE ATMOS ENVIRONMENT</div>
             <h2 className="related-title">RELATED_WARES</h2>
           </div>
           
           <div className="related-grid">
             {relatedProducts.map(rp => (
               <Link key={rp.id} to={`/shop/${rp.id}`} className="related-card">
                 <div className="related-img-wrapper">
                    <img src={rp.img} alt={rp.name} />
                 </div>
                 <div className="related-info">
                    <div className="related-name">{rp.name}</div>
                    <div className="related-price">{rp.priceStr}</div>
                 </div>
               </Link>
             ))}
           </div>
        </section>
      </main>

    </motion.div>
  );
}
