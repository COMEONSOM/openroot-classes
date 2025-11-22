// ============================================================
// NAVBAR COMPONENT — VERSION 2025.8
// FAST, CLEAN, AND PERFORMANCE-OPTIMIZED
// PURELY UI — LINKS TO SECTIONS WITHOUT LAG
// ============================================================

import { useCallback } from "react";
import "../styles/Navbar.css"; // NAVBAR-SPECIFIC STYLES

function Navbar() {
  // ==========================================================
  // HELPER FUNCTION — SAFE SCROLL TO SECTION
  // - SECTION ID MUST MATCH HTML ELEMENT ID
  // - INSTANT SCROLL (NO ANIMATION, FOR SPEED)
  // ==========================================================
  const handleSectionJump = useCallback((sectionId) => {
    try {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "auto" }); // DIRECT JUMP (NO SMOOTH SCROLL)
      } else {
        console.warn(`⚠️ Section with ID "${sectionId}" not found.`);
      }
    } catch (error) {
      console.error("❌ NAVIGATION ERROR:", error.message);
    }
  }, []);

  return (
    <header className="navbar">
      <nav className="nav-buttons">
        {/* ======================================================
           NAVIGATION BUTTONS
           ====================================================== */}

        {/* HOME BUTTON — RETURNS TO TOP */}
        <button
          className="nav-button"
          onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
        >
          Home
        </button>

        {/* COURSES BUTTON — DIRECT JUMP TO COURSES SECTION */}
        <button
          className="nav-button"
          onClick={() => handleSectionJump("available-courses")}
        >
          Courses
        </button>

        {/* FREE CONTENT BUTTON — DIRECT JUMP TO FREE CONTENT SECTION */}
        <button
          className="nav-button"
          onClick={() => handleSectionJump("free-content")}
        >
          Free Contents
        </button>

        {/* STUDY MATERIAL BUTTON — DIRECT JUMP TO STUDY MATERIAL SECTION */}
        <button
          className="nav-button"
          onClick={() => handleSectionJump("study-material")}
        >
          Study Material
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
