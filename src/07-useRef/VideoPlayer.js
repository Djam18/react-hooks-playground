import React, { useRef, useState } from 'react';

// useRef pour contrôler un element video de facon imperative
// parfois l'approche imperative est la bonne!
function VideoPlayer() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  console.log('VideoPlayer rendered');

  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleVolumeChange = (e) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    videoRef.current.volume = vol; // imperatif!
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px' }}>
      <h3>Video Player (useRef)</h3>
      {/* Big Buck Bunny - public domain video */}
      <video
        ref={videoRef}
        width="320"
        height="180"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        style={{ display: 'block', marginBottom: '10px' }}
        onEnded={() => setPlaying(false)}
      />
      <div>
        <button onClick={togglePlay} style={{ marginRight: '10px' }}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <label>Volume: </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          style={{ marginLeft: '5px' }}
        />
        <span style={{ marginLeft: '5px', fontSize: '12px' }}>{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
}

export default VideoPlayer;
