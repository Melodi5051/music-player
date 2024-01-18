import { makeAutoObservable } from 'mobx'
import { ISong } from '~/widgets/types/song'
import { getAllSong } from '../api/song'

class SongStore {
  protected songsData: ISong[] | null = null
  protected _songVolume: number = 0.05
  _songCurrent: HTMLAudioElement | null = null
  _songCurrentId: number | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setSongsData = async () => {
    const result = await getAllSong()
    if (result) {
      this.songsData = result
    }
  }

  setNewSong = (newSong: HTMLAudioElement, id: number) => {
    this._songCurrent?.pause()
    this._songCurrent = newSong
    this._songCurrentId = id
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

  nextSong = () => {}
}

export const songStore = new SongStore()
