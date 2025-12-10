export const randomDelay = (min = 1000, max = 2000) => {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min)) + min)
  );
};
