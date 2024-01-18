import { makeAutoObservable } from 'mobx'
import { ISong } from '~/widgets/types/song'
import { getAllSong } from '../api/song'
import { newSong } from '~/entities/SongCard/handlers/songHandlers'

class SongStore {
  protected songsData: ISong[] | null = null
  protected _songVolume: number = 0.01
  _songCurrent: HTMLAudioElement | null = null
  _songCurrentIndex: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setSongsData = async () => {
    const result = await getAllSong()
    if (result) {
      this.songsData = result
    }
  }

  setNewSong = (newSong: HTMLAudioElement, index: number) => {
    this._songCurrent?.pause()
    this._songCurrent = newSong
    this._songCurrentIndex = index
    this.setVolume(this._songVolume)
    this._songCurrent.play()
  }

  setVolume = (volume: number) => {
    this._songVolume = volume
    console.log(volume)

    if (this._songCurrent) {
      this._songCurrent.volume = volume
    }
  }

  getVolume = (): number => {
    return this._songVolume
  }

  getSongsData = (): ISong[] | void => {
    if (this.songsData) {
      return this.songsData
    }
  }

  nextSong = (nextSongIndex: number) => {
    try {
      if (this.songsData) {
        const newSongData = this.songsData[nextSongIndex]
        if (newSongData) {
          newSong(newSongData.file, nextSongIndex)
          return
        }
      }
      throw new Error('No next song')
    } catch (error) {
      console.error(error)
      if (this.songsData) {
        const newSongData = this.songsData[0]
        if (newSongData) {
          newSong(newSongData.file, 0)
          return
        }
      }
    }
  }
}

export const songStore = new SongStore()
