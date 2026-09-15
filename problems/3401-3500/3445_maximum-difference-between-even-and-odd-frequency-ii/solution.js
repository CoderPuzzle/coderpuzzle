/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxDifference = function (s, k) {
    const n = s.length;
    let best = -Infinity;
    for (let a = 0; a < 5; a++) {
        for (let b = 0; b < 5; b++) {
            if (a === b) continue;
            const diff = new Array(n + 1).fill(0);
            const pa = new Array(n + 1).fill(0);
            const pb = new Array(n + 1).fill(0);
            const lastBAt = new Array(n + 1).fill(0);
            let lastB = -1;
            for (let i = 0; i < n; i++) {
                const d = s.charCodeAt(i) - 48;
                diff[i + 1] = diff[i];
                pa[i + 1] = pa[i];
                pb[i + 1] = pb[i];
                if (d === a) {
                    diff[i + 1] += 1;
                    pa[i + 1] ^= 1;
                } else if (d === b) {
                    diff[i + 1] -= 1;
                    pb[i + 1] ^= 1;
                    lastB = i;
                }
                lastBAt[i + 1] = lastB;
            }
            const INF = Infinity;
            const minVal = [
                [INF, INF],
                [INF, INF],
            ];
            let prevBound = -1;
            for (let r = 1; r <= n; r++) {
                const lb = lastBAt[r];
                const bound = lb === -1 ? -1 : Math.min(r - k, lb);
                if (bound >= 0) {
                    for (let l = prevBound + 1; l <= bound; l++) {
                        const v = diff[l];
                        if (v < minVal[pa[l]][pb[l]]) {
                            minVal[pa[l]][pb[l]] = v;
                        }
                    }
                    prevBound = bound;
                    const mv = minVal[pa[r] ^ 1][pb[r]];
                    if (mv !== INF) {
                        const cand = diff[r] - mv;
                        if (cand > best) best = cand;
                    }
                }
            }
        }
    }
    return best;
};
