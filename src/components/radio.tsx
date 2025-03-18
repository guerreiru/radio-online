"use client";

import clsx from "clsx";
import { Station } from "radio-browser-api";
import { useEffect, useRef, useState } from "react";
import {
  IoPlay,
  IoPlayForward,
  IoPlayBackSharp,
  IoPause,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMute,
} from "react-icons/io5";

type RadioProps = {
  artist?: string;
  handlePrevious: () => void;
  handleNext: () => void;
  station: Station | null;
};

export function Radio({ handleNext, handlePrevious, station }: RadioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isBuffering, setIsBuffering] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (isBuffering) return;

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
    handleNext();
    setIsBuffering(false);
  };

  const increaseVolume = () => {
    if (audioRef.current && !isBuffering) {
      if (isMuted) {
        toggleMute();
      }
      audioRef.current.volume = Math.min(audioRef.current.volume + 0.05, 1);
    }
  };

  const decreaseVolume = () => {
    if (audioRef.current && !isBuffering) {
      audioRef.current.volume = Math.max(audioRef.current.volume - 0.05, 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current && !isBuffering) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setIsBuffering(true);

      const playAudio = async () => {
        try {
          const playPromise = audioRef.current!.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        } catch (error) {
          setIsPlaying(false);
        } finally {
          setIsBuffering(false);
        }
      };

      playAudio();
    }
  }, [station]);

  return (
    <div>
      <div className="max-w-72 grid place-items-center select-none">
        <div className="border-10 border-b-0 border-emerald-950 rounded-t-xl h-10 min-w-[60%] max-w-48"></div>
      </div>
      <div className="relative border-6 border-emerald-950 p-2 rounded-4xl bg-emerald-300 max-w-72 flex flex-wrap items-center justify-center md:justify-between gap-4 shadow-white shadow-inner">
        <div className="border-4 border-emerald-950 size-24 rounded-full grid place-items-center shadow-white shadow-inner ">
          <div className="border-4 border-emerald-950 size-20 rounded-full bg-emerald-900  grid place-items-center ">
            <div
              className={clsx(
                "size-14 rounded-full bg-emerald-950 shadow-white shadow-inner",
                {
                  "animate-shake": isPlaying,
                  "animate-none": !isPlaying,
                }
              )}
            ></div>
          </div>
        </div>

        <div className="border-4 border-emerald-950 rounded-3xl flex-1 w-30 shadow-white shadow-inner bg-emerald-500 p-2 flex flex-col gap-3">
          <div className="rounded-3xl bg-amber-300 h-8 flex w-full p-2 items-center text-emerald-950 overflow-hidden select-none">
            <p
              className={clsx("whitespace-nowrap select-none", {
                "animate-marquee": isPlaying,
                "animate-none": !isPlaying,
              })}
            >
              {station?.name}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div
              className="bg-emerald-950 grid place-items-center cursor-pointer py-0.5 active:bg-emerald-700 transition-all"
              onClick={decreaseVolume}
            >
              <IoVolumeLow size={14} />
            </div>
            <div
              className="bg-emerald-950 grid place-items-center cursor-pointer py-0.5 active:bg-emerald-700 transition-all"
              onClick={toggleMute}
            >
              <IoVolumeMute size={14} />
            </div>
            <div
              className="bg-emerald-950 grid place-items-center cursor-pointer py-0.5 active:bg-emerald-700 transition-all"
              onClick={increaseVolume}
            >
              <IoVolumeHigh size={14} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 place-items-center">
            <button
              className="bg-emerald-950 rounded-full p-1 grid place-items-center cursor-pointer active:bg-emerald-700 transition-all"
              onClick={handlePrevious}
              disabled={isBuffering}
            >
              <IoPlayBackSharp size={14} />
            </button>
            <button
              className="bg-emerald-950 rounded-full p-1 grid place-items-center cursor-pointer active:bg-emerald-700 transition-all"
              onClick={togglePlay}
              disabled={isBuffering}
            >
              {isPlaying ? <IoPause size={14} /> : <IoPlay size={14} />}
            </button>
            <button
              className="bg-emerald-950 rounded-full p-1 grid place-items-center cursor-pointer active:bg-emerald-700 transition-all"
              onClick={handleNext}
              disabled={isBuffering}
            >
              <IoPlayForward size={14} />
            </button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={station?.urlResolved}
        onCanPlay={handleCanPlay}
        onError={handleError}
      />
    </div>
  );
}
