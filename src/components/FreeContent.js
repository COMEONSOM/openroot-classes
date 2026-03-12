// ============================================================
// FREE CONTENT SECTION
// VERSION 2025.10 (Scrollable + Expand View)
// ============================================================

import { useState, useRef } from "react";
import "../styles/FreeContent.css";

import e1Thumbnail from "../assets/e1.avif";
import e2Thumbnail from "../assets/e2.avif";
import e3Thumbnail from "../assets/e3.avif";
import e4Thumbnail from "../assets/e4.avif";
import e5Thumbnail from "../assets/e5.avif";

const VIDEOS = [
  { id: 1, title: "Image to Cinematic Video", url: "https://youtu.be/d3JtfTJ-uVY", thumbnail: e1Thumbnail },
  { id: 2, title: "Google Antigravity IDE", url: "https://youtu.be/EMM0RmkZzhA", thumbnail: e2Thumbnail },
  { id: 3, title: "Deep Research using ChatGPT", url: "https://youtu.be/324K9jUF8tQ", thumbnail: e3Thumbnail },
  { id: 4, title: "Building an Electron App", url: "https://youtu.be/S_uSCuhMeok", thumbnail: e4Thumbnail },
  { id: 5, title: "High-CTR Thumbnails Using FLOW", url: "https://youtu.be/39zIVpJhCSU", thumbnail: e5Thumbnail },
];

const FreeContent = () => {
  const [expanded, setExpanded] = useState(false);
  const scrollRef = useRef(null);

  return (
    <section id="free-content" className="free-content-container">

      {!expanded ? (
        <>
          <h2>💎 Free Contents</h2>

          <div className="scroll-wrapper">
            <div className="video-scroll-container" ref={scrollRef}>
              {VIDEOS.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="thumbnail-container">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="video-thumbnail"
                      loading="lazy"
                    />
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-overlay"
                    >
                      <div className="video-play-button"></div>
                    </a>
                  </div>
                  <h3>{video.title}</h3>
                </div>
              ))}

              {/* View All Button */}
              <div className="view-all-card" onClick={() => setExpanded(true)}>
                ➤
                <span>View All</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="expanded-view">
          <button className="back-btn" onClick={() => setExpanded(false)}>
            ← Back
          </button>

          <div className="expanded-grid">
            {VIDEOS.map((video) => (
              <div key={video.id} className="video-card">
                <div className="thumbnail-container">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="video-thumbnail"
                  />
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-overlay"
                  >
                    <div className="video-play-button"></div>
                  </a>
                </div>
                <h3>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FreeContent;