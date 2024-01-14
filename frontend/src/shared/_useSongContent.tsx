import React, { useState, createContext, useRef } from 'react';
import { ReactNode } from 'react';

type children = { children: ReactNode };

interface SongControllerContextProps {
  currentSong: React.MutableRefObject<HTMLAudioElement | null>;

  currentSongId: number | null;
  setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>;

  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;

  intervaleDuration: NodeJS.Timer | null;
  setIntervaleDuration: React.Dispatch<
    React.SetStateAction<NodeJS.Timer | null>
  >;
}

const SongControllerContext = createContext<SongControllerContextProps>({
  currentSong: { current: null },
  status: false,

  setStatus: () => {},
  currentSongId: null,

  intervaleDuration: null,
  setIntervaleDuration: () => {},

  setCurrentSongId: () => {},
});

const useSongContent = () => {
  const [status, setStatus] = useState(false);
  const currentSong = useRef<HTMLAudioElement | null>(null);
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const [intervaleDuration, setIntervaleDuration] =
    useState<NodeJS.Timer | null>(null);

  const songData = {
    currentSong,
    status,
    setStatus,

    currentSongId,
    setCurrentSongId,

    intervaleDuration,
    setIntervaleDuration,
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
