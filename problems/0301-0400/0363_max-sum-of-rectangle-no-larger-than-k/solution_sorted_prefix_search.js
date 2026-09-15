/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var maxSumSubmatrix = function (matrix, k) {
    const m = matrix.length;
    const n = matrix[0].length;
    let best = null;
    for (let top = 0; top < m; top++) {
        // colSum[c] = sum of column c between rows top..bottom, so
        // extending the bottom row is one O(n) update; any rectangle
        // in this row pair is a contiguous subarray of colSum.
        const colSum = new Array(n).fill(0);
        for (let bottom = top; bottom < m; bottom++) {
            for (let c = 0; c < n; c++) {
                colSum[c] += matrix[bottom][c];
            }
            let prefix = 0;
            // 0 seeded so a subarray starting at the first column counts.
            const prefixes = [0];
            for (let i = 0; i < n; i++) {
                prefix += colSum[i];
                // Subarray sum = prefix - earlier prefix; the smallest
                // earlier >= prefix - k maximizes it while staying <= k.
                // bisect_left for prefix - k
                let lo = 0,
                    hi = prefixes.length;
                while (lo < hi) {
                    const mid = (lo + hi) >> 1;
                    if (prefixes[mid] < prefix - k) lo = mid + 1;
                    else hi = mid;
                }
                if (lo < prefixes.length) {
                    const candidate = prefix - prefixes[lo];
                    if (best === null || candidate > best) best = candidate;
                }
                // insort keeps the list sorted for the next query.
                let pos = prefixes.length;
                for (let t = 0; t < prefixes.length; t++) {
                    if (prefixes[t] >= prefix) {
                        pos = t;
                        break;
                    }
                }
                prefixes.splice(pos, 0, prefix);
            }
        }
    }
    return best;
};
