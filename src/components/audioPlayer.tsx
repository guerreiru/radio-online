"use client";

import { useRef, useState } from "react";
import { IoPlay, IoPause } from "react-icons/io5";

export const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCanPlay = () => {
    setIsBuffering(false);
  };

  const handleError = () => {
    setIsBuffering(false);
  };

  return (
    <div className="flex items-center space-x-4">
      {!isBuffering && (
        <button
          onClick={togglePlay}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {isPlaying ? <IoPause /> : <IoPlay />}
        </button>
      )}

      {isBuffering && <span>Carregando...</span>}

      <audio
        ref={audioRef}
        src={src}
        className="hidden"
        onCanPlay={handleCanPlay}
        onError={handleError}
      />

      {!isBuffering && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.volume = parseFloat(e.target.value);
            }
          }}
          className="w-24"
        />
      )}
    </div>
  );
};
