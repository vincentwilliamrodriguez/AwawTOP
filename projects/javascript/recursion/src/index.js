function fibs(n) {
  const res = [];
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    res.push(a);
    [a, b] = [b, a + b];
  }

  return res;
}

function fibsRec(n) {
  const fibsCache = new Map();

  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(fibsGet(i, { fibsCache }))
  }

  return res;
}

function fibsGet(i, { fibsCache }) {
  if (fibsCache.has(i)) {
    return fibsCache.get(i);
  }

  if (i <= 1) {
    fibsCache.set(i, i);
    return i;
  }

  const sum = fibsGet(i - 2, { fibsCache }) + fibsGet(i - 1, { fibsCache });
  fibsCache.set(i, sum);
  return sum;
}

console.log(fibs(1));
console.log(fibsRec(1));

console.log(fibs(2));
console.log(fibsRec(2));

console.log(fibs(5));
console.log(fibsRec(5));

console.log(fibs(8));
console.log(fibsRec(8));
