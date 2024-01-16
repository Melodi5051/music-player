import { ISong } from '~/widgets/types/song'

type SongDurationProps = Pick<ISong, 'duration'> & {
  type: 'default' | 'play'
}
export function SongDuration({ ...props }: SongDurationProps) {
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60)
    const seconds = Math.floor(duration % 60)

    const formattedMinutes = minutes.toString().padStart(1, '0')
    const formattedSeconds = seconds.toString().padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
  }

  const className =
    props.type === 'play'
      ? 'song-card-duration-play dark:text-white'
      : 'song-card-duration-default dark:text-white'

  // if (props.type === 'play' && props.id === props.currentSongId) {
  //   return <p className={className}>{formatDuration(props.duration)}</p>;
  // }

  return <p className={className}>{formatDuration(props.duration)}</p>
}
