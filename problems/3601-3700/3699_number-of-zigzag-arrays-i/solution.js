/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function (n, l, r) {
    const MOD = 1e9 + 7;
    const m = r - l + 1;
    // up[x] / down[x]: length-i arrays ending at value x whose last step
    // rose / fell. Every single value starts both tables at length 1; the
    // zigzag law then forces each next step to flip direction. Every
    // intermediate stays far inside Number's exact integer range.
    let up = new Array(m).fill(1);
    let down = new Array(m).fill(1);
    for (let len = 2; len <= n; len++) {
        // A rising-ending array may only continue onto a smaller value, so
        // new down[y] sums up[x] over x > y -- a running suffix total.
        const newDown = new Array(m);
        let total = 0;
        for (let y = m - 1; y >= 0; y--) {
            newDown[y] = total;
            total = (total + up[y]) % MOD;
        }
        // Mirror image: new up[y] sums down[x] over x < y.
        const newUp = new Array(m);
        total = 0;
        for (let y = 0; y < m; y++) {
            newUp[y] = total;
            total = (total + down[y]) % MOD;
        }
        up = newUp;
        down = newDown;
    }
    let answer = 0;
    for (let x = 0; x < m; x++) {
        answer += up[x] + down[x];
    }
    return answer % MOD;
};
