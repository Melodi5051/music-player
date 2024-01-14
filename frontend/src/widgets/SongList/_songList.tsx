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
    status,
    currentSongId,
    setCurrentSongId,
    currentSong,
    intervaleDuration,
    setIntervaleDuration
  } = useSongContent();

  //Проверка на пустой контекст
  const songDataList = songData ? (
    songData.map((song: SongProps) => (
      <SongCard
        key={song.id}
        {...song}
        status={status}
        currentSongId={currentSongId}
        setCurrentSongId={setCurrentSongId}
        currentSong={currentSong}
        intervaleDuration={intervaleDuration}
        setIntervaleDuration={setIntervaleDuration}
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
