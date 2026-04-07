import './AtmosFooter.css';

export default function AtmosFooter() {
  return (
    <>
      <div className="marquee-container">
        <div className="marquee-track">
           <span>FUNCTIONAL BRUTALISM // SEOUL GLOBALLY // </span>
           <span>FUNCTIONAL BRUTALISM // SEOUL GLOBALLY // </span>
           <span>FUNCTIONAL BRUTALISM // SEOUL GLOBALLY // </span>
           <span>FUNCTIONAL BRUTALISM // SEOUL GLOBALLY // </span>
        </div>
      </div>

      <footer className="atmos-footer">
        <div className="footer-meta-item">
          <span className="sys-text">© 2026 ATMOS LABEL</span>
        </div>
        <div className="footer-meta-item">
          <span className="sys-text">SEOUL / SOUTH KOREA</span>
        </div>
        <div className="footer-meta-item">
          <span className="sys-text">SYSTEM.STATE: STABLE</span>
        </div>
      </footer>
    </>
  );
}
