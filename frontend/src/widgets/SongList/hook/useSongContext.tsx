import { ReactNode, createContext, useEffect, useState } from 'react';
import { ISong } from '~/widgets/types/song';

const SongContext = createContext<ISong[] | null>(null);
const url = 'http://localhost:3000/audioFiles/';

type children = { children: ReactNode };

function useGetAllSong() {
  const [songData, setSongData] = useState<ISong[]>([]);

  useEffect(() => {
    async function fetchDataSong() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setSongData(data);
      } catch (error) {
        console.error('@error', error);
      }
    }
    // вызов запроса
    fetchDataSong();

    // отмена подписки при размонтировании
    return () => {};
  }, []);

  return songData;
}

function SongProvider({ children }: children) {
  const songData = useGetAllSong();
  return (
    <SongContext.Provider value={songData}>{children}</SongContext.Provider>
  );
}
export { SongProvider, SongContext };
