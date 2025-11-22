// ============================================================
// FOOTER COMPONENT — VERSION 2025.8
// src/components/Footer.jsx
// ============================================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

// ---------- IMPORTED ICONS ----------
import WhatsAppLogo from '../assets/whatsapp.svg';
import GmailLogo from '../assets/gmail.svg';
import DiscordLogo from '../assets/discord.svg';
import YouTubeLogo from '../assets/youtube.svg';
import FacebookLogo from '../assets/facebook.svg'; 
import xLogo from '../assets/x.svg';

// ---------- CONSTANT LINKS ----------
const FOUNDER_DETAILS_URL = 'https://comeonsom.github.io/openroot-helping-hand/other_files/founder.html';
const TERMS_PAGE_URL = 'https://comeonsom.github.io/openroot-helping-hand/other_files/terms.html';

// ============================================================
// TYPEWRITER COMPONENT — HANDLES TEXT ANIMATION SAFELY
// ============================================================
const Typewriter = () => {
  const TYPEWRITER_TEXT = "GOOD THINGS TAKE TIME!";

  const [display, setDisplay] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    let timer;
    const fullText = TYPEWRITER_TEXT;

    if (pause) {
      timer = setTimeout(() => {
        setPause(false);
        setIsDeleting(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && display.length < fullText.length) {
      timer = setTimeout(() => setDisplay(fullText.slice(0, display.length + 1)), 150);
    } else if (!isDeleting && display.length === fullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 5000);
    } else if (isDeleting && display.length > 0) {
      timer = setTimeout(() => setDisplay(fullText.slice(0, display.length - 1)), 80);
    } else if (isDeleting && display.length === 0) {
      setPause(true);
    }

    return () => clearTimeout(timer);
  }, [display, isDeleting, pause]);

  return (
    <div className="typewriter-text" aria-hidden="false">
      <span style={{ fontWeight: 700 }}>{display}</span>
      <span className="cursor" aria-hidden="true">|</span>
    </div>
  );
};

// ============================================================
// FOOTER COMPONENT — MAIN WRAPPER
// ============================================================
const Footer = () => {
  // Safe link opener
  const openLinkSafely = (url) => {
    try {
      if (!url || typeof url !== 'string') throw new Error('INVALID URL');
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('LINK OPEN ERROR:', error);
      // graceful fallback — do not throw
    }
  };

  const socialLinks = [
    { href: 'https://discord.com/users/1379877073631576095', src: DiscordLogo, alt: 'Discord' },
    { href: 'https://www.youtube.com/@knowledge.openroot', src: YouTubeLogo, alt: 'YouTube' },
    { href: 'https://www.facebook.com/share/14L7KqiQG5Z/', src: FacebookLogo, alt: 'Facebook' },
    { href: 'https://x.com/comeonsom_?t=GCaq6uE0FodJOuC8854iEg&s=09', src: xLogo, alt: 'x' },
  ];

  return (
    <>
      <div className="contact-container">
        <div className="contact-follow-wrapper">

          <div className="contact-section card" role="region" aria-label="Contact">
            <h2>Contact Us</h2>

            <div className="button-container" role="group" aria-label="Contact buttons">
              <motion.button
                type="button"
                className="icon-button"
                aria-label="Contact via WhatsApp"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openLinkSafely('https://wa.me/917866049865')}
              >
                <img src={WhatsAppLogo} alt="WhatsApp" className="icon-img" />
              </motion.button>

              <motion.button
                type="button"
                className="icon-button"
                aria-label="Contact via Email"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => openLinkSafely('https://mail.google.com/mail/?view=cm&fs=1&to=connect.openroot@gmail.com')}
              >
                <img src={GmailLogo} alt="Gmail" className="icon-img" />
              </motion.button>
            </div>
          </div>

          <div className="follow-us-section card" role="region" aria-label="Follow us">
            <h3 className="follow-us-heading">Follow Us</h3>

            <div className="social-icons" role="list">
              {socialLinks.map(({ href, src, alt }) => (
                <motion.a
                  key={alt}
                  href={href}
                  className="social-link"
                  role="listitem"
                  aria-label={`Visit ${alt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  onClick={(e) => { e.preventDefault(); openLinkSafely(href); }}
                >
                  <img src={src} alt={alt} className="icon-img" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="typewriter-wrapper card" role="region" aria-label="Motivational quote">
            <Typewriter />
          </div>

        </div>
      </div>

      <footer className="footer" role="contentinfo">
        <p>
          <motion.span
            className="clickable-text"
            role="link"
            tabIndex={0}
            onClick={() => openLinkSafely(FOUNDER_DETAILS_URL)}
            whileHover={{ scale: 1.04 }}
          >
            Founder Details
          </motion.span>
          {' | '}
          <motion.span
            className="clickable-text"
            role="link"
            tabIndex={0}
            onClick={() => openLinkSafely(TERMS_PAGE_URL)}
            whileHover={{ scale: 1.04 }}
          >
            Terms of Service
          </motion.span>
        </p>
        <p>© {new Date().getFullYear()} OPENROOT. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
