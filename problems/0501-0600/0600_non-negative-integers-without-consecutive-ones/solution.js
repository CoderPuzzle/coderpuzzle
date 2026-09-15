/**
 * @param {number} n
 * @return {number}
 */
var findIntegers = function (n) {
    const s = n.toString(2);
    const m = s.length;
    // fib[i] = number of binary strings of length i with no consecutive 1s
    const fib = new Array(m + 2).fill(0);
    fib[0] = 1;
    fib[1] = 2;
    for (let i = 2; i <= m; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    let res = 0;
    for (let i = 0; i < m; i++) {
        if (s[i] === "1") {
            // place 0 here, suffix can be anything without consecutive ones
            res += fib[m - i - 1];
            if (i > 0 && s[i - 1] === "1") {
                // n itself already contains consecutive ones; stop counting
                return res;
            }
        }
    }
    return res + 1; // count n itself (its binary has no consecutive ones)
};
