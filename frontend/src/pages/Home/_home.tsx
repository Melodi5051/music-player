import { useEffect } from 'react'
import { songStore } from '~/app/providers/SongStore'
import SongList from '~/widgets/SongList'

export function Home() {
  useEffect(() => {
    songStore.setSongsData()
  }, [])
  return (
    <div>
      <SongList />
    </div>
  )
}
