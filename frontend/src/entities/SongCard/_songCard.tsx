import './_songCard.scss';

import { ISong } from '~/widgets/types/song';
import { SongContent } from '~/shared/SongContent';
import { SongDuration } from '~/shared/SongDuration';
import { SongLogo } from '~/shared/SongLogo';


interface SongCardProps extends ISong {
  handleSongCardClick: (file: string, id: number) => void;
  currentSong: HTMLAudioElement | null;
  status: boolean;
  currentSongId: number | null;
}

export function SongCard({ ...props }: SongCardProps) {
  return (
    <div
      className='song-card'
      onClick={() => {
        props.handleSongCardClick(props.file, props.id);
      }}
    >
      <div className='song-card-content'>
        <SongLogo {...props} type='default' />
        <SongContent {...props} />
      </div>
      <SongDuration
        {...props}
        duration={
          props.currentSong && props.currentSongId === props.id
            ? props.currentSong.currentTime
            : props.duration
        }
        currentSongId={props.currentSongId}
        type={props.status ? 'play' : 'default'}
      />
    </div>
  );
}
