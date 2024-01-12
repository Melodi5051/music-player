import React, { useState, createContext, useEffect } from 'react';
import { ReactNode } from 'react';
import { setInterval } from 'timers/promises';

type children = { children: ReactNode };

interface SongControllerContextProps {
  currentSong: HTMLAudioElement | null;
  currentSongId: number | null;

  setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;

  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;

  intervaleDuration: NodeJS.Timer | null;
  setIntervaleDuration: React.Dispatch<
    React.SetStateAction<NodeJS.Timer | null>
  >;

  play: (song: HTMLAudioElement) => void;
  pause: (song: HTMLAudioElement) => void;
  setDuration: (newDuration: number) => void;
  getDuration: () => number;
}

const SongControllerContext = createContext<SongControllerContextProps>({
  currentSong: null,
  status: false,

  setStatus: () => {},
  currentSongId: null,

  intervaleDuration: null,
  setIntervaleDuration: () => {},

  setCurrentSongId: () => {},
  setCurrentSong: () => {},

  play: (song: HTMLAudioElement) => {},
  pause: (song: HTMLAudioElement) => {},

  setDuration: (newDuration: number) => {},
  getDuration: () => 0,
});

const useSongContent = () => {
  const [status, setStatus] = useState(false);
  const [currentSong, setCurrentSong] = useState<HTMLAudioElement | null>(null);
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [durationTime, setDurationTime] = useState<number>(0);

  const [intervaleDuration, setIntervaleDuration] =
    useState<NodeJS.Timer | null>(null);

  const play = (song: HTMLAudioElement) => {
    song.volume = 0.05;

    song.play();
  };

  const pause = (song: HTMLAudioElement) => {
    console.log(song);
    song.pause();
  };

  const setDuration = (newDuration: number) => {
    setDurationTime(newDuration);
  };

  const getDuration = (): number => {
    return currentSong?.currentTime || 0;
  };

  const songData = {
    currentSong,
    status,
    setStatus,

    setCurrentSong,

    currentSongId,
    setCurrentSongId,

    intervaleDuration,
    setIntervaleDuration,

    play,
    pause,

    setDuration,
    getDuration,
  };

  return songData;
};

function SongControllerProvider({ children }: children) {
  const songData = useSongContent();
  return (
    <SongControllerContext.Provider value={songData}>
      {children}
    </SongControllerContext.Provider>
  );
}

export { useSongContent, SongControllerProvider };
