import { ISong } from '~/widgets/types/song'

type SongLogoProps = Pick<ISong, 'title' | 'photo'> & { type: string }
export function SongLogo({ ...props }: SongLogoProps) {
  return (
    <img
      src={`http://localhost:3000/${props.photo}`}
      alt={props.title}
      className="w-[40px] h-[40px] rounded-xl"
    />
  )
}
