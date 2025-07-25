function getRandomNumber(min, max) {
  // Generate a random number between 0 and 1
  const randomFraction = Math.random();

  // Scale the random fraction to the desired range
  const randomInRange = randomFraction * (max - min + 1) + min;

  // Use Math.floor to round down to the nearest integer
  const randomInteger = Math.floor(randomInRange);

  return randomInteger;
}
export {getRandomNumber}