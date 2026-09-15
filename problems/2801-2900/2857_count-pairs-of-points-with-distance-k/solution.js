/**
 * @param {number[][]} coordinates
 * @param {number} k
 * @return {number}
 */
var countPairs = function (coordinates, k) {
    const SCALE = 1048576;
    const seen = new Map();
    let total = 0;
    for (const [x, y] of coordinates) {
        for (let split = 0; split <= k; split++) {
            const probe = (x ^ split) * SCALE + (y ^ (k - split));
            const previous = seen.get(probe) || 0;
            total += previous;
        }
        const key = x * SCALE + y;
        seen.set(key, (seen.get(key) || 0) + 1);
    }
    return total;
};
