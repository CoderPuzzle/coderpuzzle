/**
 * @param {string} s
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var countKConstraintSubstrings = function (s, k, queries) {
    const n = s.length;
    const bounds = new Array(n).fill(0);
    let left = 0;
    let zeros = 0;
    let ones = 0;
    for (let right = 0; right < n; right++) {
        if (s[right] === "0") {
            zeros++;
        } else {
            ones++;
        }
        while (zeros > k && ones > k) {
            if (s[left] === "0") {
                zeros--;
            } else {
                ones--;
            }
            left++;
        }
        bounds[right] = left;
    }
    const pre = new Array(n + 1).fill(0);
    for (let j = 0; j < n; j++) {
        pre[j + 1] = pre[j] + (j + 1 - bounds[j]);
    }
    const next = new Array(n).fill(n);
    let ptr = n;
    for (let l = n - 1; l >= 0; l--) {
        while (ptr > 0 && bounds[ptr - 1] >= l) {
            ptr--;
        }
        next[l] = ptr;
    }
    const answer = [];
    for (const query of queries) {
        const l = query[0];
        const r = query[1];
        const j = next[l];
        if (j > r) {
            const m = r - l + 1;
            answer.push((m * (m + 1)) / 2);
        } else {
            const d = j - l;
            answer.push(pre[r + 1] - pre[j] + (d * (d + 1)) / 2);
        }
    }
    return answer;
};
