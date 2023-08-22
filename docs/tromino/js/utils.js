export function randomFourLetterId() {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  let id = "";
  for (let i = 0; i < 5; i++) {
    id += letters[Math.floor(Math.random() * letters.length)];
  }
  return id;
}

export function getRandomColor() {
  const letters = "23456789ABCDEF";
  let color = "#";
  for (let i = 1; i <= 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
