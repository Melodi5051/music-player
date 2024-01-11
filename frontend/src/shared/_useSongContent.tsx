import React, { useState, createContext } from 'react';
import { ReactNode } from 'react';

type children = { children: ReactNode };

interface SongControllerContextProps {
  currentSong: HTMLAudioElement | null;
  currentSongId: number | null;
  setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentSong: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;

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

  const play = (song: HTMLAudioElement) => {
    song.volume = 0.05;
    song.play();
  };

  const pause = (song: HTMLAudioElement) => {
    console.log(song);
    song.pause();
  };

  const setDuration = (newDuration: number) => {
    // Реализуйте логику для установки новой продолжительности
  };

  const getDuration = (): number => {
    // Реализуйте логику для получения продолжительности
    return 0;
  };

  const songData = {
    currentSong,
    status,
    setStatus,

    setCurrentSong,
    currentSongId,
    setCurrentSongId,

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
