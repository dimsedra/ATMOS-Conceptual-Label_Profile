import React, { useState } from 'react';
import './YouTubePlayer.css';

export default function YouTubePlayer({ videoId, title = "YouTube Video" }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoId) return null;

  const handleMouseEnter = () => {
    if (isPlaying) {
      document.body.classList.add('hide-custom-cursor');
    }
  };

  const handleMouseLeave = () => {
    document.body.classList.remove('hide-custom-cursor');
  };

  const handleClick = () => {
    setIsPlaying(true);
    document.body.classList.add('hide-custom-cursor');
  };

  return (
    <div 
      className={`youtube-player-wrapper ${isPlaying ? 'is-playing' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isPlaying && (
        <div 
          className="youtube-interactive-overlay" 
          onClick={handleClick}
        >
          <div className="play-button-indicator">PLAY</div>
        </div>
      )}
      <iframe
        className={`youtube-iframe ${!isPlaying ? 'pointer-disabled' : ''}`}
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1${isPlaying ? '&autoplay=1' : ''}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}
