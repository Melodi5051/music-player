import Play from '~/assets/play.svg'
import Pause from '~/assets/pause.svg'
import VolumeHight from '~/assets/volumeHight.svg'
import './_songController.scss'
// import VolumeOff from '~/assets/volumeOff.svg'
import { useRef, useState } from 'react'

interface SongControllerProps {
  currentSong: HTMLAudioElement
  status: boolean
  duration: number
  setPropgressView: React.Dispatch<React.SetStateAction<number>>
  setDuration: React.Dispatch<React.SetStateAction<number>>
  fullDuration: number
}

function SongController({ ...props }: SongControllerProps) {
  const [isOpenVolume, setIsOpenVolume] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleOpenVolume = () => {
    setIsOpenVolume(!isOpenVolume)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef?.current?.getBoundingClientRect()) {
      const progressBarRect = containerRef.current.getBoundingClientRect()
      const clickPosition = e.clientX - progressBarRect.left
      const newPositionPercentage =
        (clickPosition / progressBarRect.width) * 100
      const newCurrentTime = (props.fullDuration / 100) * newPositionPercentage
      props.currentSong.currentTime = newCurrentTime
      const currentPercentage =
        (newCurrentTime / props.currentSong.duration) * 100
      props.setDuration(newCurrentTime)
      props.setPropgressView(currentPercentage)
    }
  }

  return (
    <div className=" bg-white dark:bg-[#e2f0ff25] rounded-xl flex items-center gap-3 w-full p-2 animate-progress mt-0.2">
      <button className="dark:fill-white">
        {!props.status ? <Play /> : <Pause />}
      </button>
      <div className="cursor-pointer h-[20px] w-full rounded">
        <div
          ref={containerRef}
          className=" h-full bg-black rounded dark:bg-white"
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
            handleMouseDown(e)
          }
        >
          <div
            className="h-full bg-pink-300 rounded-sm"
            style={{ width: `${props.duration}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center rounded-xl">
        <button
          className="flex p-1 bg-transparent rounded-2xl "
          onClick={handleOpenVolume}
        >
          <div className="fill-black">
            <VolumeHight />
          </div>
        </button>
        <div
          className={`translition-all duration-300 ease-out cursor-pointer w-0 rounded-full h-[4px] dark:bg-white ${isOpenVolume ? 'open' : ''}`}
        >
          <div
            className="h-full rounded-full bg-pink-300"
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>
    </div>
  )
}
export { SongController }
