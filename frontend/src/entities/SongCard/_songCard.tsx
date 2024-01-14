import './_songCard.scss';

import { ISong } from '~/widgets/types/song';
import { SongContent } from '~/shared/SongContent';
import { SongDuration } from '~/shared/SongDuration';
import { SongLogo } from '~/shared/SongLogo';
import { memo, useEffect, useState } from 'react';

interface SongCardProps extends ISong {
  status: boolean;
  currentSongId: number | null;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentSongId: React.Dispatch<React.SetStateAction<number | null>>;
  currentSong: React.MutableRefObject<HTMLAudioElement | null>;
}

export function SongCard({ ...props }: SongCardProps) {
  const [duration, setDuration] = useState(props.duration);
  const [statusView, setStatusView] = useState(props.status);
  
  function SetNewMusic() {
    const audio = new Audio(`http://localhost:3000/${props.file}`);
    if (props.currentSong.current) {
      PauseMusic(props.currentSong.current);
    }
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      props.currentSong.current = audio;
      audio.volume = 0.05;
      PlayMusic(audio);
    };
    props.setCurrentSongId(props.id);
    props.setStatus(true);
  }

  function PlayMusic(audio: HTMLAudioElement) {
    audio.play();
    props.setStatus(true);
  }
  function PauseMusic(audio: HTMLAudioElement) {
    audio.pause();
    props.setStatus(false);
  }

  function handlePlay() {
    if (props.currentSongId !== props.id) {
      setStatusView(true);
      SetNewMusic();
      return;
    }
    if (statusView && props.currentSong.current) {
      PauseMusic(props.currentSong.current);
      setStatusView(false);
      return;
    }
    if (props.currentSong.current) {
      PlayMusic(props.currentSong.current);
      setStatusView(true);
      return;
    }
  }

  // useEffect(() => {

  // }, [duration, statusView]);

  return (
    <div className='song-card' onClick={handlePlay}>
      <div className='song-card-content'>
        <SongLogo {...props} type='default' />
        <SongContent {...props} />
      </div>
      {props.currentSongId === props.id && (
        <div>{statusView ? 'Воспроизведение' : 'Пауза'}</div>
      )}
      <SongDuration duration={duration} type='default' />
    </div>
  );
}
