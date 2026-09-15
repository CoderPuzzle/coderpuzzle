/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var kthFactor = function (n, k) {
    const small = [];
    let i = 1;
    while (i * i <= n) {
        if (n % i === 0) {
            small.push(i);
            if (small.length === k) {
                return i;
            }
        }
        i++;
    }
    const count = small.length;
    const perfectSquare = (i - 1) * (i - 1) === n && n % (i - 1) === 0;
    const total = perfectSquare ? 2 * count - 1 : 2 * count;
    if (k > total) {
        return -1;
    }
    return n / small[total - k];
};
