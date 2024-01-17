import { SongControllerProvider } from '~/shared/_useSongContent'
import SongList from '~/widgets/SongList'
import { SongProviderContext } from '~/widgets/SongList/hook/useSongContext'

export function Home() {
  return (
    <div>
      <SongProviderContext>
        <SongControllerProvider>
          <SongList />
        </SongControllerProvider>
      </SongProviderContext>
    </div>
  )
}
