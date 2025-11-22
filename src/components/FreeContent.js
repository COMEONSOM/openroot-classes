// ============================================================
// FREE CONTENT SECTION
// VERSION 2025.8
// ============================================================

import '../styles/FreeContent.css';
// Import thumbnail images from the assets folder
import e1Thumbnail from '../assets/e1.avif'; // Add more thumbnails as needed

const FreeContent = () => {
  const videos = [
    { 
      title: 'Introduction to Investing', 
      url: 'https://youtu.be/-9sFkPw3pX8?si=DiMbHXCe633JUAI4',
      thumbnail: e1Thumbnail // Reference the imported image
    },
    // Add more videos as needed
  ];

  return (
    <div id="free-content" className="free-content-container">
      <h2>💎 Free Contents</h2>
      <div className="video-list">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <div className="thumbnail-container">
              <img src={video.thumbnail} alt={`Thumbnail for ${video.title}`} className="video-thumbnail" />
              <a href={video.url} target="_blank" rel="noopener noreferrer" className="video-overlay">
                <div className="video-play-button"></div>
              </a>
            </div>
            <div className="video-info">
              <h3 className="video-title">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeContent;
