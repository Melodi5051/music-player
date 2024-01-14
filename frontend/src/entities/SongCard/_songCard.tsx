import './_songCard.scss';

import { ISong } from '~/widgets/types/song';
import { SongContent } from '~/shared/SongContent';
import { SongDuration } from '~/shared/SongDuration';
import { SongLogo } from '~/shared/SongLogo';
import { useEffect, useState } from 'react';

interface SongCardProps extends ISong {
  status: React.MutableRefObject<boolean>;
  currentSongId: number | null;
  setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>;
  currentSong: React.MutableRefObject<HTMLAudioElement | null>;
  intervaleDuration: NodeJS.Timer | null;
  setIntervaleDuration: React.Dispatch<
    React.SetStateAction<NodeJS.Timer | null>
  >;
}

export function SongCard({ ...props }: SongCardProps) {
  const [duration, setDuration] = useState(props.duration);
  const [statusView, setStatusView] = useState(props.status.current);

  function SetNewMusic() {
    const audio = new Audio(`http://localhost:3000/${props.file}`);

    if (props.currentSong.current) {
      pauseMusic(props.currentSong.current);
    }

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      props.currentSong.current = audio;
      audio.volume = 0.05;
      playMusic(audio);
    };

    props.setCurrentSongId(props.id);
    props.status.current = true;
  }

  function playMusic(audio: HTMLAudioElement) {
    setDuration(audio.currentTime);

    const timer = setInterval(() => {
      if (duration <= props.duration) {
        setDuration(audio.currentTime);
      }
    }, 1000);

    props.setIntervaleDuration(timer);

    audio.play();
    props.status.current = true;
  }
  function pauseMusic(audio: HTMLAudioElement) {
    if (props.intervaleDuration) {
      clearInterval(+props.intervaleDuration);
    }
    audio.pause();
    props.status.current = false;
  }

  function handlePlay() {
    if (props.currentSongId !== props.id) {
      setStatusView(true);
      SetNewMusic();

      return;
    }

    if (statusView && props.currentSong.current) {
      pauseMusic(props.currentSong.current);
      setStatusView(false);
      return;
    }

    if (props.currentSong.current) {
      playMusic(props.currentSong.current);
      setStatusView(true);
      return;
    }
  }

  useEffect(() => {
    if (props.currentSongId !== props.id) {
      setDuration(props.duration);
    }
  });
  return (
    <div className='song-card' onClick={handlePlay}>
      <div className='song-card-content'>
        <SongLogo {...props} type='default' />
        <SongContent {...props} />
      </div>

      <SongDuration duration={duration} type='default' />
    </div>
  );
}
