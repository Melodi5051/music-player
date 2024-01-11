import SongList from '~/widgets/SongList';
import { SongProvider } from '~/widgets/SongList/hook/useSongContext';

export function Home() {
  return (
    <div>
      <SongProvider>
        <SongList />
      </SongProvider>
    </div>
  );
}
