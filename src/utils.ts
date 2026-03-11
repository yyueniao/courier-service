export const parsePositiveIntSafely = (str: string, name: string): number => {
  const num = parseInt(str, 10);

  if (isNaN(num) || num <= 0) {
    console.error(`Error: Please provide a valid ${name}.`);
    process.exit(1);
  }

  return num;
};
