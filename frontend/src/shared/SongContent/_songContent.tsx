import './_songContent.scss';
import { ISong } from '~/widgets/types/song';

type SongContentProps = Pick<ISong, 'title' | 'author'>;

export function SongContent({ ...props }: SongContentProps) {
  return (
    <div className="song-card-content-text">
      <h4>{props.title}</h4>
      <p>{props.author}</p>
    </div>
  );
}
