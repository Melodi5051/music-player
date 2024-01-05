import { makeAutoObservable, runInAction } from "mobx";
import { songTypes } from "../types/song";
import { getAllSongs } from "../API/song";

class StoreSong {
  dataSong: songTypes[] = [];
  currentSong: HTMLAudioElement | null = null;
  status: boolean = false;
  currentSongId: number | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  playSong({ ...song }: songTypes) {
    if (this.currentSongId === song.id && this.status) {
      this.pauseSong();
      return;
    }
    if (this.currentSongId === song.id) {
      this.currentSong?.play();
      this.status = !this.status;
      return;
    }

    this.currentSong?.pause();
    this.status = false;
    this.currentSong = new Audio(`http://localhost:3000/${song.file}`);
    this.currentSong.volume = 0.01;
    this.currentSong.play();
    this.currentSongId = song.id;
    this.status = !this.status;
  }

  pauseSong() {
    this.currentSong?.pause();
    this.status = !this.status;
  }

  async setDataSong() {
    const response = await getAllSongs();
    if (response) {
      runInAction(() => {
        this.dataSong = response;
      });
    }
  }

  getDataSong(): songTypes[] | void {
    console.log(this.dataSong);
    return this.dataSong;
  }
}

export const storeSong = new StoreSong();
