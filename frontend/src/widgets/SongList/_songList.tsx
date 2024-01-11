import './_songList.scss';

import { SongCard } from '~/entities/SongCard';
import { ISong } from '../types/song';
import { useContext } from 'react';
import { SongContext } from './hook/useSongContext';
import { useSongContent } from '~/shared/_useSongContent';

interface SongProps extends ISong {}

export function SongList() {
  const songData: ISong[] | null = useContext(SongContext);

  const {
    currentSongId,
    play,
    pause,
    setCurrentSongId,
    setCurrentSong,
    setStatus,
    currentSong,
    status,
  } = useSongContent();
  const handlePlaySong = (file: string, id: number) => {
    if (currentSongId === id && currentSong && status) {
      pause(currentSong);
      setStatus(false);
      return;
    }
    if (currentSongId === id && currentSong && !status) {
      play(currentSong);
      setStatus(true);
      return;
    }
    if (currentSong) {
      console.log(currentSong);
      pause(currentSong);
      setStatus(false);
      currentSong.currentTime = 0;
    }
    const song = new Audio(`http://localhost:3000/${file}`);
    setCurrentSongId(id);
    setCurrentSong(song);
    setStatus(true);
    play(song);
  };

  //Проверка на пустой контекст
  const songDataList = songData ? (
    songData.map((song: SongProps) => (
      <SongCard key={song.id} {...song} handleSongCardClick={handlePlaySong} />
    ))
  ) : (
    <></>
  );

  return (
    <div className="song-list">
      <h1>Список песен</h1>
      {songDataList}
    </div>
  );
}
