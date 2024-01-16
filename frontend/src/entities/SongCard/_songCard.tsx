import { ISong } from '~/widgets/types/song'
import { SongContent } from '~/shared/SongContent'
import { SongDuration } from '~/shared/SongDuration'
import { SongLogo } from '~/shared/SongLogo'
import { useEffect, useState } from 'react'
import { SongController } from '~/shared/SongFooter'

interface SongCardProps extends ISong {
  status: React.MutableRefObject<boolean>
  currentSongId: number | null
  setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>
  currentSong: React.MutableRefObject<HTMLAudioElement | null>
  intervaleDuration: React.MutableRefObject<NodeJS.Timer | null>
  volume: number
  setVolume: React.Dispatch<React.SetStateAction<number>>
  index: number
  handleNextSong: (index: number) => void
}

export function SongCard({ ...props }: SongCardProps) {
  const [duration, setDuration] = useState(props.duration)
  const [statusView, setStatusView] = useState(props.status.current)
  const [propgressView, setPropgressView] = useState(0)

  function SetNewMusic(file: string) {
    const audio = new Audio(`http://localhost:3000/${file}`)

    if (props.currentSong.current) {
      pauseMusic(props.currentSong.current)
    }

    audio.onloadedmetadata = () => {
      setDuration(audio.duration)
      props.currentSong.current = audio
      audio.volume = props.volume
      playMusic(audio)
    }

    props.setCurrentSongId(props.id)
    props.status.current = true
  }

  function playMusic(audio: HTMLAudioElement) {
    setDuration(audio.currentTime)

    const timer = setInterval(() => {
      const currentPercentage = (audio.currentTime / audio.duration) * 100
      setPropgressView(currentPercentage)
      setDuration(audio.currentTime)
      if (audio.currentTime >= audio.duration) {
        props.handleNextSong(props.index)
        clearInterval(timer)
        props.status.current = false
        setPropgressView(0)
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
      SetNewMusic(props.file)

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
    if (props.currentSong.current) {
      props.currentSong.current.volume = props.volume
    }
  }, [props.volume])

  useEffect(() => {
    if (props.currentSongId !== props.id) {
      setPropgressView(0)
      setDuration(props.duration)
    }
  })

  useEffect(() => {
    if (props.currentSongId === props.id && !statusView) {
      SetNewMusic(props.file)
      setStatusView(true)
      console.log('@', 'вызов')
    }
  }, [props.currentSongId])

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div
        className="flex items-center justify-around dark:bg-[#e2f0ff25] gap-4  py-0 px-4 rounded-xl w-full cursor-pointer"
        onClick={handlePlay}
      >
        <div className="flex items-center w-full gap-4">
          <SongLogo {...props} type="default" />
          <SongContent {...props} />
        </div>
        <SongDuration duration={duration} type="default" />
      </div>
      {props.currentSongId === props.id ? (
        <SongController
          status={statusView}
          duration={propgressView}
          currentSong={props.currentSong.current as HTMLAudioElement}
          setPropgressView={setPropgressView}
          setDuration={setDuration}
          fullDuration={props.duration}
          setVolume={props.setVolume}
          volume={props.volume}
        />
      ) : null}
    </div>
  )
}
