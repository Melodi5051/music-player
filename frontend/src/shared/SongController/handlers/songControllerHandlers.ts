export const formatDuration = (
  maxDuration: number,
  duration: number | undefined,
) => {
  if (!duration) return 0
  return Math.floor((duration * 100) / maxDuration)
}
