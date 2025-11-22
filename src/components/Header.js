// ============================================================
// HEADER COMPONENT — VERSION 1.1.4
// CLEAN, RESPONSIVE, AND PERFORMANCE-OPTIMIZED
// ============================================================
// manforceutube

import "../styles/Header.css"; // HEADER-SPECIFIC STYLES
import logo from "../assets/openroot-white-nobg.png"; // COMPANY LOGO

function Header() {
  return (
    <header className="header">
      {/* ======================================================
         COMPANY LOGO + NAME + SLOGAN
         ====================================================== */}
      <div className="company-info">
        <img src={logo} alt="Company Logo" className="company-logo" />
        <span id="classes" className="brand-tag">#classes</span>
      </div>
    </header>
  );
}

export default Header;
