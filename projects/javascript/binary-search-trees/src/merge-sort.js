export default function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const half = parseInt(array.length / 2);
  const left = mergeSort(array.slice(0, half));
  const right = mergeSort(array.slice(half));
  const res = [];
  let i = 0;
  let j = 0;

  while (i + j < array.length) {
    const a = i < left.length ? left[i] : Infinity;
    const b = j < right.length ? right[j] : Infinity;

    if (a < b) {
      res.push(a);
      i++;
    } else if (a > b) {
      res.push(b);
      j++;
    } else {
      i++;
    }
  }

  return res;
}
