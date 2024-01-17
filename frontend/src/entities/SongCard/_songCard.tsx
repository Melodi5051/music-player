import { ISong } from '~/widgets/types/song'
import { SongContent } from '~/shared/SongContent'
import { SongDuration } from '~/shared/SongDuration'
import { SongLogo } from '~/shared/SongLogo'
import { useEffect, useRef, useState } from 'react'
import { SongController } from '~/shared/SongFooter'

interface SongCardProps extends ISong {
  status: React.MutableRefObject<boolean>
  currentSongId: number | null
  setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>
  currentSong: React.MutableRefObject<HTMLAudioElement | null>
  intervaleDuration: React.MutableRefObject<NodeJS.Timer | null>
}

function progressDuration(duration: number): number {
  const progress = (1 / duration) * 100
  console.log(progress)
  return progress
}

export function SongCard({ ...props }: SongCardProps) {
  const [duration, setDuration] = useState(props.duration)
  const [statusView, setStatusView] = useState(props.status.current)
  const progress = useRef(progressDuration(props.duration))
  const [propgressView, setPropgressView] = useState(0)

  function SetNewMusic() {
    const audio = new Audio(`http://localhost:3000/${props.file}`)

    if (props.currentSong.current) {
      pauseMusic(props.currentSong.current)
    }

    audio.onloadedmetadata = () => {
      setDuration(audio.duration)
      props.currentSong.current = audio
      audio.volume = 0.1
      playMusic(audio)
    }

    props.setCurrentSongId(props.id)
    props.status.current = true
  }

  function playMusic(audio: HTMLAudioElement) {
    setDuration(audio.currentTime)

    const timer = setInterval(() => {
      if (duration <= props.duration && propgressView <= 100) {
        setDuration(audio.currentTime)
        setPropgressView(propgressView => propgressView + progress.current)
      }
    }, 1000)

    props.intervaleDuration.current = timer

    audio.play()
    props.status.current = true
  }
  function pauseMusic(audio: HTMLAudioElement) {
    if (props.intervaleDuration.current) {
      clearInterval(props.intervaleDuration.current as unknown as number)
    }
    audio.pause()
    props.status.current = false
  }

  function handlePlay() {
    if (props.currentSongId !== props.id) {
      setStatusView(true)
      SetNewMusic()

      return
    }

    if (statusView && props.currentSong.current) {
      pauseMusic(props.currentSong.current)
      setStatusView(false)
      return
    }

    if (props.currentSong.current) {
      playMusic(props.currentSong.current)
      setStatusView(true)
      return
    }
  }

  useEffect(() => {
    if (props.currentSongId !== props.id) {
      setPropgressView(0)
      setDuration(props.duration)
    }
  })
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div
        className="flex items-center justify-around bg-[#e2f0ff25] py-0 px-4 rounded-xl w-full cursor-pointer"
        onClick={handlePlay}
      >
        <div className="flex items-center w-full gap-4">
          <SongLogo {...props} type="default" />
          <SongContent {...props} />
        </div>
        <SongDuration duration={duration} type="default" />
      </div>
      {props.currentSongId === props.id ? (
        <SongController status={statusView} duration={propgressView} />
      ) : null}
    </div>
  )
}
