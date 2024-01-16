import { ISong } from '~/widgets/types/song'

type SongContentProps = Pick<ISong, 'title' | 'author'>

export function SongContent({ ...props }: SongContentProps) {
  return (
    <div className="flex flex-col items-start dark:text-white">
      <h4 className="font-bold dark:text-white">{props.title}</h4>
      <p className="font-medium dark:text-white">{props.author}</p>
    </div>
  )
}
