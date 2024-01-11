import { SongCard } from '~/shared/SongCard';
import { ISong } from '../types/song';
import { useContext } from 'react';
import { SongContext } from './hook/useSongContext';

interface SongProps extends ISong {}

export function SongList() {
  const songData: ISong[] | null = useContext(SongContext);

  //Проверка на пустой контекст
  const songDataList = songData
    ? songData.map((song: SongProps) => <SongCard {...song} />)
    : [];

  return (
    <div>
      <h1>Список песен</h1>
      {songDataList}
    </div>
  );
}
