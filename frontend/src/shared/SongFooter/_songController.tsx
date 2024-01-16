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
  setVolume: React.Dispatch<React.SetStateAction<number>>
  volume: number
}

function SongController({ ...props }: SongControllerProps) {
  const [isOpenVolume, setIsOpenVolume] = useState<boolean>(false)
  const containerRefProgressBar = useRef<HTMLDivElement>(null)
  const containerRefVolume = useRef<HTMLDivElement>(null)
  const [currentPercentage, setCurrentPercentage] = useState(props.volume * 100)
  const handleOpenVolume = () => {
    setIsOpenVolume(!isOpenVolume)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRefProgressBar?.current?.getBoundingClientRect()) {
      const progressBarRect =
        containerRefProgressBar.current.getBoundingClientRect()
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
  const handleMouseDownVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRefVolume?.current?.getBoundingClientRect()) {
      const maxWidth =
        containerRefVolume?.current?.getBoundingClientRect().width
      const newPosition =
        e.clientX - containerRefVolume?.current?.getBoundingClientRect().left

      const newPositionInPercentage = (newPosition / maxWidth) * 100
      setCurrentPercentage(newPositionInPercentage)
      const newVolume = Number(
        (Number((newPosition / maxWidth).toFixed(2)) / 4).toFixed(2),
        
      )
      console.log(newVolume)
      props.setVolume(newVolume >= 0 ? newVolume : 0)
    }
  }
  return (
    <div className=" bg-white dark:bg-[#e2f0ff25] rounded-xl flex items-center gap-3 w-full p-2 animate-progress mt-0.2">
      <button className="dark:fill-white">
        {!props.status ? <Play /> : <Pause />}
      </button>
      <div className="cursor-pointer h-[20px] w-full rounded">
        <div
          ref={containerRefProgressBar}
          className=" h-full bg-black dark:bg-white"
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
            handleMouseDown(e)
          }
        >
          <div
            className="h-full bg-pink-300 "
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
          ref={containerRefVolume}
          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
            handleMouseDownVolume(e)
          }
          className={`translition-all duration-300 ease-out cursor-pointer w-0 h-[10px] dark:bg-white ${isOpenVolume ? 'open' : ''}`}
        >
          <div
            className="h-full bg-pink-300"
            style={{ width: `${currentPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
export { SongController }
