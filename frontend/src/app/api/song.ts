import { ISong } from '~/widgets/types/song'

export const getAllSong = async (): Promise<ISong[] | void> => {
  try {
    const response = await fetch('http://localhost:3000/audioFiles')
    return response.json()
  } catch (error) {
    console.error('@error', error)
  }
}
