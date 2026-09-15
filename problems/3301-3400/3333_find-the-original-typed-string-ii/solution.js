/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var possibleStringCount = function (word, k) {
    const MOD = 1000000007;
    // Each maximal run of length c contributes between 1 and c intended
    // characters; count tuples of total length >= k as total - (length < k).
    const runs = [];
    let i = 0;
    const n = word.length;
    while (i < n) {
        let j = i;
        while (j < n && word[j] === word[i]) {
            j++;
        }
        runs.push(j - i);
        i = j;
    }

    const r = runs.length;
    let total = 1;
    for (const c of runs) {
        total = (total * c) % MOD;
    }
    if (k <= r) {
        return total; // every tuple already has length >= r >= k
    }

    // dp[j] = number of ways to reach total length j (< k).
    let dp = new Array(k).fill(0);
    dp[0] = 1;
    const prefix = new Array(k + 1).fill(0);
    for (const c of runs) {
        let s = 0;
        for (let j = 0; j < k; j++) {
            s = (s + dp[j]) % MOD;
            prefix[j + 1] = s;
        }
        const ndp = new Array(k).fill(0);
        for (let j = 1; j < k; j++) {
            const lo = Math.max(0, j - c);
            ndp[j] = (prefix[j] - prefix[lo] + MOD) % MOD;
        }
        dp = ndp;
    }

    let bad = 0;
    for (let j = 0; j < k; j++) {
        bad = (bad + dp[j]) % MOD;
    }
    return (((total - bad) % MOD) + MOD) % MOD;
};
