import './_songCard.scss';

import { ISong } from '~/widgets/types/song';
import { SongContent } from '~/shared/SongContent';
import { SongDuration } from '~/shared/SongDuration';
import { SongLogo } from '~/shared/SongLogo';

interface SongCardProps extends ISong {
  handleSongCardClick: (file: string, id: number) => void;
}

export function SongCard({ ...props }: SongCardProps) {
  return (
    <button
      style={{ border: 'none', background: 'none', padding: '0' }}
      onClick={() => {
        props.handleSongCardClick(props.file, props.id);
      }}
    >
      <div className="song-card">
        <div className="song-card-content">
          <SongLogo {...props} type="default" />
          <SongContent {...props} />
        </div>
        <SongDuration {...props} type="reverse" />
      </div>
    </button>
  );
}
