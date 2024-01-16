import { SongCard } from '~/entities/SongCard'
import { ISong } from '../types/song'
import { useContext } from 'react'
import { SongContext } from './hook/useSongContext'
import { useSongContent } from '~/shared/_useSongContent'

interface SongProps extends ISong {}

export function SongList() {
  const songData: ISong[] | null = useContext(SongContext)
  const {
    status,

    currentSongId,
    setCurrentSongId,

    currentSong,
    intervaleDuration,

    volume,
    setVolume,
  } = useSongContent()

  const handleNextSong = (currentSongIndex: number) => {
    setCurrentSongId(songData![currentSongIndex + 1].id)
    status.current = false
  }

  //Проверка на пустой контекст
  const songDataList = songData ? (
    songData.map((song: SongProps, index: number) => (
      <SongCard
        key={song.id}
        {...song}
        status={status}
        currentSongId={currentSongId}
        setCurrentSongId={setCurrentSongId}
        currentSong={currentSong}
        intervaleDuration={intervaleDuration}
        volume={volume}
        setVolume={setVolume}
        index={index}
        handleNextSong={handleNextSong}
      />
    ))
  ) : (
    <></>
  )

  return (
    <div className="flex flex-col gap-2">
      <h1>Список песен</h1>
      {songDataList}
    </div>
  )
}
