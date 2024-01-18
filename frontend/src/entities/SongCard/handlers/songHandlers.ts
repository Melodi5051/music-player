import { songStore } from '~/app/providers/SongStore'

const clickSong = (
  song: HTMLAudioElement,
  status: boolean,
  setStatus: React.Dispatch<React.SetStateAction<boolean>>,
): void => {
  status ? song.pause() : song.play()
  setStatus(!status)
}

const newSong = (
  file: string,
  index: number,
  setStatus?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const song = new Audio('http://localhost:3000/' + file)
  songStore.setNewSong(song, index)
  if (setStatus) {
    setStatus(true)
  }
}

export { clickSong, newSong }
