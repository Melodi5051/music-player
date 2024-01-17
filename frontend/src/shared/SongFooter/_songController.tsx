import Play from '~/assets/play.svg'
import Pause from '~/assets/pause.svg'
import VolumeHight from '~/assets/volumeHight.svg'
import './_songController.scss'
// import VolumeOff from '~/assets/volumeOff.svg'
import { useState } from 'react'

interface SongControllerProps {
  status: boolean
  duration: number
}

function SongController({ ...props }: SongControllerProps) {
  const [isOpenVolume, setIsOpenVolume] = useState<boolean>(false)

  const handleOpenVolume = () => {
    setIsOpenVolume(!isOpenVolume)
  }

  return (
    <div className="song-controller bg-opacity-60 bg-white rounded-md flex items-center gap-4 w-full p-4 animate-progress ">
      <div>
        <button>{!props.status ? <Play /> : <Pause />}</button>
      </div>
      <div className="cursor-pointer h-[4px] w-full rounded-xl">
        <div className=" h-full bg-black rounded-xl">
          <div
            className="h-full bg-pink-300 rounded-xl"
            style={{ width: `${props.duration}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center rounded-xl">
        <button
          className="flex p-1 bg-transparent rounded-2xl "
          onClick={handleOpenVolume}
        >
          <VolumeHight />
        </button>
        <div
          className={`translition-all duration-300 ease-out cursor-pointer w-0 rounded-full h-[4px] bg-black ${isOpenVolume ? 'open' : ''}`}
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
