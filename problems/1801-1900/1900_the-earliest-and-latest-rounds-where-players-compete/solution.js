/**
 * @param {number} n
 * @param {number} firstPlayer
 * @param {number} secondPlayer
 * @return {number[]}
 */
var earliestAndLatest = function (n, firstPlayer, secondPlayer) {
    // State: ranks i, j of the two stars in a row of m survivors.
    const memo = new Map();
    const dp = (i, j, m) => {
        if (i + j === m + 1) {
            return [1, 1];
        }
        if (i > m - j + 1) {
            return dp(m - j + 1, m - i + 1, m);
        }
        const key = `${i},${j},${m}`;
        const cached = memo.get(key);
        if (cached) {
            return cached;
        }
        const half = (m + 1) >> 1;
        const free = [];
        for (let k = 1; k <= half; k++) {
            const back = m + 1 - k;
            if (k < back && i !== k && i !== back && j !== k && j !== back) {
                free.push([k, back]);
            }
        }
        let lo = n;
        let hi = 0;
        for (let mask = 0; mask < 1 << free.length; mask++) {
            const survivors = [];
            for (let k = 1; k <= half; k++) {
                const back = m + 1 - k;
                if (k === back) {
                    survivors.push(k);
                } else if (i === k || i === back) {
                    survivors.push(i);
                } else if (j === k || j === back) {
                    survivors.push(j);
                } else {
                    let pick = back;
                    for (let t = 0; t < free.length; t++) {
                        if (free[t][0] === k && ((mask >> t) & 1) === 1) {
                            pick = k;
                        }
                    }
                    survivors.push(pick);
                }
            }
            survivors.sort((a, b) => a - b);
            const [subLo, subHi] = dp(survivors.indexOf(i) + 1, survivors.indexOf(j) + 1, survivors.length);
            lo = Math.min(lo, subLo);
            hi = Math.max(hi, subHi);
        }
        const res = [lo + 1, hi + 1];
        memo.set(key, res);
        return res;
    };
    const [e, l] = dp(firstPlayer, secondPlayer, n);
    return [e, l];
};
