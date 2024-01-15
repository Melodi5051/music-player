import { ISong } from '~/widgets/types/song'

type SongContentProps = Pick<ISong, 'title' | 'author'>

export function SongContent({ ...props }: SongContentProps) {
  return (
    <div className="flex flex-col items-start">
      <h4 className="font-bold">{props.title}</h4>
      <p className="font-medium">{props.author}</p>
    </div>
  )
}
