/**
 * @param {string} s
 * @return {string}
 */
var lexicographicallySmallestString = function (s) {
    const n = s.length;
    if (n <= 1) return s;

    const consec = (a, b) => {
        const d = Math.abs(a.charCodeAt(0) - b.charCodeAt(0));
        return d === 1 || d === 25; // 'a'-'z' are consecutive (circular)
    };

    // rem[i][j] = can s[i..j] be removed entirely
    const rem = Array.from({ length: n }, () => new Array(n).fill(false));
    for (let length = 2; length <= n; length++) {
        for (let i = 0; i + length <= n; i++) {
            const j = i + length - 1;
            for (let k = i; k < j; k++) {
                if (rem[i][k] && rem[k + 1][j]) {
                    rem[i][j] = true;
                    break;
                }
            }
            if (!rem[i][j] && consec(s[i], s[j])) {
                if (length === 2 || rem[i + 1][j - 1]) {
                    rem[i][j] = true;
                }
            }
        }
    }

    const ans = new Array(n + 1);
    ans[n] = "";
    for (let i = n - 1; i >= 0; i--) {
        let best = null;
        for (let j = i; j <= n; j++) {
            if (j > i && !rem[i][j - 1]) continue;
            const cand = j < n ? s[j] + ans[j + 1] : "";
            if (best === null || cand < best) best = cand;
        }
        ans[i] = best;
    }
    return ans[0];
};
