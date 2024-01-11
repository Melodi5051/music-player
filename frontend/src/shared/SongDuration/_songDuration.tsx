import './_songDuration.scss';

import { ISong } from '~/widgets/types/song';

type SongDurationProps = Pick<ISong, 'duration'> & { type: string };

export function SongDuration({ ...props }: SongDurationProps) {
  const duration =
    props.type === 'reverse'
      ? '-' + props.duration
      : Math.floor(props.duration / 60) + ':' + Math.floor(props.duration % 60);

  const className =
    props.type === 'reverse'
      ? 'song-card-duration-reverse'
      : 'song-card-duration-default';

  return <p className={className}>{duration}</p>;
}
