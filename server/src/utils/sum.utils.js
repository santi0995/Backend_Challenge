function sum() {
  let count = 0;
  for (let i = 0; i < 5e9; i++) {
    count++;
  }
  return count;
}

process.on("message", () => {
  const result = sum();
  process.send(result);
});
