export const handlerConvertDuration = (duration: string): string => {
  const minute = Math.floor(+duration / 60);
  const second = +duration % 60;
  return `${minute}:${second}`;
};
