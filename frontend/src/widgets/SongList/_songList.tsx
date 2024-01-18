import { observer } from 'mobx-react-lite'
import { songStore } from '~/app/providers/SongStore'
import { ISong } from '../types/song'
import { SongCard } from '~/entities/SongCard'

export const SongList = observer(function SongList() {
  
  return (
    <div className="flex flex-col gap-2">
      <h1>Список песен</h1>
      {songStore.getSongsData() ? (
        songStore
          .getSongsData()
          ?.map((song: ISong) => (
            <SongCard key={song.id} {...song} status={false} />
          ))
      ) : (
        <></>
      )}
    </div>
  )
})
