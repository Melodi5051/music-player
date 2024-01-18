import { ISong } from '~/widgets/types/song'
import { SongContent } from '~/shared/SongContent'
import { SongDuration } from '~/shared/SongDuration'
import { SongLogo } from '~/shared/SongLogo'
import { SongController } from '~/shared/SongController'
import { songStore } from '~/app/providers/SongStore'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { clickSong, newSong } from './handlers/songHandlers'

interface SongCardProps extends ISong {
  status: boolean
  index: number
  onClick: (index: number) => void
}

export const SongCard = observer(function SongCard({ ...props }: SongCardProps) {
  const [localStatus, setlocalStatus] = useState<boolean>(props.status)
  const [duration, setDuration] = useState<number>(0)

  const handlePlaySong = (songId: number) => {
    if (songStore._songCurrentIndex === songId && songStore._songCurrent) {
      clickSong(songStore._songCurrent, localStatus, setlocalStatus)
      return
    }
    newSong(props.file, props.index, setlocalStatus)
  }

  //НЕ ОПТИМИЗИРОВАНЫЙ ВАРИНАТ ЧЕРЕЗ REQUESTANIMATIONFRAME

  // const updateFrame = () => {
  //   if (duration > props.duration) {
  //     const handle = requestAnimationFrame(updateFrame)
  //     cancelAnimationFrame(handle)
  //     return
  //   }

  //   if (songStore._songCurrent && songStore._songCurrentId === props.id) {
  //     setDuration(songStore._songCurrent?.currentTime)
  //   }

  //   requestAnimationFrame(updateFrame)
  // }

  // useEffect(() => {
  //   const handle = requestAnimationFrame(updateFrame)

  //   return () => {
  //     cancelAnimationFrame(handle)
  //   }
  // }, [])

  const updateFrame = () => {
    if (songStore._songCurrent && songStore._songCurrentIndex === props.index) {
      setDuration(songStore._songCurrent?.currentTime)
    }

    setTimeout(updateFrame, 1000)
  }

  useEffect(() => {
    const handle = setTimeout(updateFrame, 1000)

    return () => {
      clearTimeout(handle)
    }
  }, [])

  useEffect(() => {
    if (duration > props.duration) {
      props.onClick(props.index + 1)
      setlocalStatus(false)
    }
  }, [duration])

  const propsDuration = {
    duration:
      songStore._songCurrentIndex === props.index ? duration : props.duration,
  }

  const propsController = {
    status: localStatus,

    maxVolume: 1,
    volume: songStore.getVolume(),
    setVolume: songStore.setVolume,

    duration:
      songStore._songCurrentIndex === props.index
        ? songStore._songCurrent?.currentTime
        : 0,
    maxDuration: props.duration,
    setDuration: setDuration,
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div
        className="flex items-center justify-around dark:bg-[#e2f0ff25] gap-4  py-0 px-4 rounded-xl w-full cursor-pointer"
        onClick={_ => handlePlaySong(props.index)}
      >
        <div className="flex items-center w-full gap-4">
          <SongLogo {...props} type="default" />
          <SongContent {...props} />
        </div>
        <SongDuration {...propsDuration} type="default" />
      </div>
      {songStore._songCurrentIndex === props.index ? (
        <SongController {...propsController} />
      ) : null}
    </div>
  )
})



