import './_songList.scss';

import { SongCard } from '~/entities/SongCard';
import { ISong } from '../types/song';
import { useContext, useEffect } from 'react';
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

    setIntervaleDuration,
    intervaleDuration,

    status,

    setDuration,
    getDuration,
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
      pause(currentSong);
      setStatus(false);
      currentSong.currentTime = 0;
    }

    const song = new Audio(`http://localhost:3000/${file}`);
    setCurrentSongId(id);
    setCurrentSong(song);
    setStatus(true);

    const interval = setInterval(() => {
      setDuration(song.currentTime);
    }, 1000);
    setIntervaleDuration(interval);

    play(song);
  };

  useEffect(() => {
    console.log('@@@@', currentSong);
  }, [intervaleDuration]);

  //Проверка на пустой контекст
  const songDataList = songData ? (
    songData.map((song: SongProps) => (
      <SongCard
        key={song.id}
        {...song}
        handleSongCardClick={handlePlaySong}
        status={status}
        currentSongId={currentSongId}
        currentSong={currentSong}
      />
    ))
  ) : (
    <></>
  );

  return (
    <div className='song-list'>
      <h1>Список песен</h1>
      {songDataList}
    </div>
  );
}
