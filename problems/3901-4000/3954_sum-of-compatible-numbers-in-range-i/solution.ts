// @ts-nocheck
var sumOfGoodIntegers = function (n, k) {
    let s = 0;
    for (let x = Math.max(1, n - k); x <= n + k; x++) if ((n & x) === 0) s += x;
    return s;
};
