/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumLength = function (nums, k) {
    // remap values to compact ids
    const mapping = new Map();
    const remapped = [];
    for (const x of nums) {
        if (!mapping.has(x)) {
            mapping.set(x, mapping.size);
        }
        remapped.push(mapping.get(x));
    }
    const V = mapping.size;

    // dp[j][v] = max length of a good subsequence ending with value v
    // having exactly j transitions
    const dp = [];
    for (let j = 0; j <= k; j++) dp.push(new Array(V).fill(0));
    const best1 = new Array(k + 1).fill(0); // max over v of dp[j][v]
    const val1 = new Array(k + 1).fill(-1); // argmax
    const best2 = new Array(k + 1).fill(0); // second max over v != val1

    for (const x of remapped) {
        const cand = new Array(k + 1).fill(0);
        for (let j = 0; j <= k; j++) {
            let c = dp[j][x] + 1; // extend a same-value subsequence
            if (j > 0) {
                const top = val1[j - 1] !== x ? best1[j - 1] : best2[j - 1];
                const diff = top + 1; // append after a different value
                if (diff > c) c = diff;
            }
            if (j === 0 && 1 > c) c = 1;
            cand[j] = c;
        }
        for (let j = 0; j <= k; j++) {
            const nv = cand[j];
            if (nv <= dp[j][x]) continue;
            dp[j][x] = nv;
            if (val1[j] === x) {
                best1[j] = nv;
            } else {
                if (nv > best1[j]) {
                    best2[j] = best1[j];
                    best1[j] = nv;
                    val1[j] = x;
                } else if (nv > best2[j]) {
                    best2[j] = nv;
                }
            }
        }
    }

    let ans = 0;
    for (let j = 0; j <= k; j++) {
        if (best1[j] > ans) ans = best1[j];
    }
    return ans;
};
