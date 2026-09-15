/**
 * @param {number} upper
 * @param {number} lower
 * @param {number[]} colsum
 * @return {number[][]}
 */
var reconstructMatrix = function (upper, lower, colsum) {
    const n = colsum.length;
    let twos = 0,
        ones = 0;
    for (const s of colsum) {
        if (s === 2) ++twos;
        else if (s === 1) ++ones;
    }
    // Every 2 spends one from each row; the top row cannot exceed its cap.
    if (2 * twos + ones !== upper + lower || upper < twos || upper > twos + ones) return [];
    // First (upper - twos) free columns go on top; nothing else is chosen.
    let freeTop = upper - twos;
    const top = new Array(n).fill(0);
    const bottom = new Array(n).fill(0);
    for (let i = 0; i < n; ++i) {
        if (colsum[i] === 2) {
            top[i] = bottom[i] = 1;
        } else if (colsum[i] === 1) {
            if (freeTop > 0) {
                top[i] = 1;
                --freeTop;
            } else {
                bottom[i] = 1;
            }
        }
    }
    return [top, bottom];
};
