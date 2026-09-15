/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxDistance = function (s, k) {
    // Manhattan distance is the max of sx*x + sy*y over the four quadrant
    // signings, and every step contributes +/-1 to that signing. Flipping
    // a misaligned step to an aligned one buys +2, so the best reachable
    // value at each prefix is cur + 2*min(k, mis).
    let best = 0;
    for (const sx of [1, -1]) {
        for (const sy of [1, -1]) {
            let cur = 0;
            let mis = 0;
            for (const c of s) {
                let step;
                if (c === "N") {
                    step = sy;
                } else if (c === "S") {
                    step = -sy;
                } else if (c === "E") {
                    step = sx;
                } else {
                    step = -sx;
                }
                cur += step;
                if (step < 0) {
                    mis++;
                }
                best = Math.max(best, cur + 2 * Math.min(k, mis));
            }
        }
    }
    return best;
};
