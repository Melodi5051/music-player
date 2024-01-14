import React, { useState, createContext, useRef } from 'react';
import { ReactNode } from 'react';

type children = { children: ReactNode };

interface SongControllerContextProps {
  currentSong: React.MutableRefObject<HTMLAudioElement | null>;

  currentSongId: number | null;
  setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>;

  status: React.MutableRefObject<boolean>;

  intervaleDuration: React.MutableRefObject<NodeJS.Timer | null>;
}

const SongControllerContext = createContext<SongControllerContextProps>({
  currentSong: { current: null },
  status: { current: false },

  currentSongId: null,

  intervaleDuration: { current: null },

  setCurrentSongId: () => {},
});

const useSongContent = () => {
  const status = useRef<boolean>(false);
  const currentSong = useRef<HTMLAudioElement | null>(null);
  const [currentSongId, setCurrentSongId] = useState<number | null>(null);
  const intervaleDuration = useRef<NodeJS.Timer | null>(null);

  const songData = {
    currentSong,
    status,

    currentSongId,
    setCurrentSongId,

    intervaleDuration,
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
