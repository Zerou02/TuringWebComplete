export const firstLetterToUpper = (str: string) => {
  let a = str.slice(0, 1).toUpperCase();
  let b = str.slice(1, str.length);
  return a + b;
};
