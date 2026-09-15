/**
 * @param {string} num
 * @return {number}
 */
var numberOfCombinations = function (num) {
    const MOD = 1000000007;
    const n = num.length;
    if (n === 0 || num.charCodeAt(0) === 48 /* '0' */) {
        return 0;
    }

    // lcp[i][j] = length of the longest common prefix of num[i:] and num[j:]
    const stride = n + 1;
    const lcp = new Uint16Array(stride * stride);
    for (let i = n - 1; i >= 0; i--) {
        const ci = num.charCodeAt(i);
        const off = i * stride;
        const noff = (i + 1) * stride;
        for (let j = n - 1; j >= 0; j--) {
            if (ci === num.charCodeAt(j)) {
                lcp[off + j] = lcp[noff + j + 1] + 1;
            }
        }
    }

    // pre[i][j] = sum_{k=1..j} dp[i][k] (mod MOD), where dp[i][j] counts
    // separations of num[:i] whose last number is num[i-j:i].
    // dp is recovered from consecutive pre differences mod MOD.
    const pre = new Int32Array(stride * stride);
    for (let i = 1; i <= n; i++) {
        const ioff = i * stride;
        for (let j = 1; j <= i; j++) {
            let val;
            if (j === i) {
                val = 1; // whole prefix num[:i] is a single number
            } else if (num.charCodeAt(i - j) === 48 /* '0' */) {
                val = 0; // leading zero not allowed
            } else {
                const m = i - j;
                const lim = j - 1 < m ? j - 1 : m;
                val = pre[m * stride + lim];
                if (m >= j) {
                    const a = i - 2 * j;
                    const b = m;
                    const l = lcp[a * stride + b];
                    if (l >= j || num.charCodeAt(a + l) <= num.charCodeAt(b + l)) {
                        let add = pre[m * stride + j] - pre[m * stride + j - 1];
                        if (add < 0) {
                            add += MOD;
                        }
                        val += add;
                        if (val >= MOD) {
                            val -= MOD;
                        }
                    }
                }
            }
            const t = pre[ioff + j - 1] + val;
            pre[ioff + j] = t >= MOD ? t - MOD : t;
        }
    }
    return pre[n * stride + n];
};
