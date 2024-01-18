import Play from '~/assets/play.svg'
import Pause from '~/assets/pause.svg'
import VolumeHight from '~/assets/volumeHight.svg'
import './_songController.scss'
import { useEffect, useRef, useState } from 'react'
import { songStore } from '~/app/providers/SongStore'
import { formatDuration } from './handlers/songControllerHandlers'
// import VolumeOff from '~/assets/volumeOff.svg'
// import { useRef, useState } from 'react'

interface SongControllerProps {
  status: boolean

  volume: number
  setVolume: (newVolume: number) => void
  maxVolume: number

  duration: number | undefined
  setDuration: React.Dispatch<React.SetStateAction<number>>
  maxDuration: number
}

function SongController({ ...props }: SongControllerProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [tempDuration, setTempDuration] = useState<number>(0)
  const [tempVolume, setTempVolume] = useState<number>(0)
  const [isOpenVolume, setisOpenVolume] = useState<boolean>(false)
  const [circle, setCircle] = useState(false)

  const animationFrameRef = useRef<number | null>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    updateProgress(e, 'duration')
    requestAnimationFrame(updateFrame)
  }

  const handleMouseDownVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    updateProgress(e, 'volume')
    requestAnimationFrame(updateFrame)
  }

  const updateFrame = () => {
    if (isDragging) {
      animationFrameRef.current = requestAnimationFrame(updateFrame)
    }
  }

  const updateFrameVolume = () => {
    if (isDragging) {
      animationFrameRef.current = requestAnimationFrame(updateFrameVolume)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    cancelAnimationFrame(animationFrameRef.current || 0)

    if (songStore._songCurrent) {
      const newDuration = props.maxDuration * (Math.floor(tempDuration) / 100)
      songStore._songCurrent.currentTime = newDuration
      props.setDuration(newDuration)
    }
  }

  const handleMouseUpVolume = () => {
    setIsDragging(false)
    cancelAnimationFrame(animationFrameRef.current || 0)
    const newDuration = Number(
      (props.maxVolume * (Math.floor(tempVolume) / 100)).toFixed(2),
    )

    props.setVolume(newDuration)
    console.log(songStore.getVolume())
  }

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    type: 'duration' | 'volume',
  ) => {
    if (isDragging) {
      type === 'duration'
        ? updateProgress(e, 'duration')
        : updateProgress(e, 'volume')
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(
          type === 'duration' ? updateFrame : updateFrameVolume,
        )
      }
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setTempDuration(Math.min(100, Math.max(0, tempDuration || 0)))
      setIsDragging(false)
      cancelAnimationFrame(animationFrameRef.current || 0)
    }
  }

  const handleMouseLeaveVolume = () => {
    if (circle) {
      setCircle(false)
    }
    if (isDragging) {
      setTempVolume(Math.min(100, Math.max(0, tempVolume || 0)))
      setIsDragging(false)
      cancelAnimationFrame(animationFrameRef.current || 0)
    }
  }

  const updateProgress = (
    e: React.MouseEvent<HTMLDivElement>,
    type: 'duration' | 'volume',
  ) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const newProgress = (offsetX / rect.width) * 100
    type === 'duration'
      ? setTempDuration(Math.min(100, Math.max(0, newProgress)))
      : setTempVolume(Math.min(100, Math.max(0, newProgress)))
  }

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationFrameRef.current || 0)
    }
  }, [])

  return (
    <div
      className=" bg-white dark:bg-[#e2f0ff25] rounded-xl flex items-center gap-3 w-full p-2 animate-progress mt-0.2"
      onKeyDown={e => e.preventDefault()}
    >
      <button className="dark:fill-white">
        {props.status ? <Pause /> : <Play />}
      </button>
      <div className="cursor-pointer h-[20px] w-full rounded">
        <div
          className=" h-full bg-black dark:bg-white"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={(e: any) => handleMouseMove(e, 'duration')}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="h-full bg-pink-300 "
            style={{
              width: `${isDragging ? tempDuration : formatDuration(props.maxDuration, props.duration)}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="flex items-center rounded-xl">
        <button
          className="flex p-1 bg-transparent rounded-2xl "
          onClick={_ => setisOpenVolume(!isOpenVolume)}
        >
          <div className="fill-black">
            <VolumeHight />
          </div>
        </button>

        <div
          className={`translition-all duration-300 ease-out cursor-pointer flex items-center w-0 h-[3px] dark:bg-white ${isOpenVolume ? 'open' : ''}`}
          onMouseDown={handleMouseDownVolume}
          onMouseUp={handleMouseUpVolume}
          onMouseMove={(e: any) => handleMouseMove(e, 'volume')}
          onMouseLeave={handleMouseLeaveVolume}
          onMouseEnter={() => setCircle(true)}
        >
          <div
            className="h-full bg-pink-300 "
            style={{
              width: `${isDragging ? tempVolume : formatDuration(props.maxVolume, props.volume)}%`,
            }}
          ></div>
          {circle && (
            <div className="w-1.5 h-1.5 bg-pink-400 rounded-[50px]"></div>
          )}
        </div>
      </div>
    </div>
  )
}
export { SongController }
