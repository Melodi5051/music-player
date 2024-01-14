import './_songController.scss';
import Play from '~/assets/play.svg';
import Pause from '~/assets/pause.svg';
import VolumeHight from '~/assets/volumeHight.svg';
import VolumeOff from '~/assets/volumeOff.svg';
import { useState } from 'react';
import { ISong } from '~/widgets/types/song';

interface SongControllerProps {
  status: boolean;
  duration: number;
}

function SongController({ ...props }: SongControllerProps) {
  const [isOpenVolume, setIsOpenVolume] = useState<boolean>(false);

  const handleOpenVolume = () => {
    setIsOpenVolume(!isOpenVolume);
  };

  return (
    <div className='song-controller'>
      <div className='song-controller-play'>
        <button className='song-controller-button'>
          {props.status ? <Play /> : <Pause />}
        </button>
      </div>
      <div className='song-controller-progress'>
        <div className='song-controller-progress-bar'>
          <div
            className='song-controller-progress-bar-inner'
            style={{ width: `${props.duration}%` }}
          ></div>
        </div>
      </div>
      <div className='song-controller-volume'>
        <button className='song-controller-button' onClick={handleOpenVolume}>
          <VolumeHight />
        </button>
        <div className={`song-controller-volume-bar ${isOpenVolume && 'open'}`}>
          <div
            className='song-controller-volume-bar-inner'
            style={{ width: '50%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export { SongController };
