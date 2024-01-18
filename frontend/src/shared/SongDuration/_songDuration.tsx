import { ISong } from '~/widgets/types/song'
import { formatDuration } from './handlers/songDurationHandlers'

type SongDurationProps = Pick<ISong, 'duration'> & {
  type: 'default' | 'play'
}
export function SongDuration({ ...props }: SongDurationProps) {
  const className =
    props.type === 'play'
      ? 'song-card-duration-play dark:text-white'
      : 'song-card-duration-default dark:text-white'

  return <p className={className}>{formatDuration(props.duration)}</p>
}
