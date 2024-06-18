function mergeSort(array) {
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
    } else {
      res.push(b);
      j++;
    }
  }

  return res;
}

console.log('Awaw', mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log('Awaw', mergeSort([105, 79, 100, 110]));
