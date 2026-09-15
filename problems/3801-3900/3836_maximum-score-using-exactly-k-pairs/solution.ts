function maxScore(nums1: number[], nums2: number[], k: number): number {
    // Bounds: n, m <= 100 and |values| <= 10^6, so each product is at most
    // 10^12 and the k <= 100-term total at most 10^14 < 2^53 — every sum
    // and product along the way stays exact in JS numbers.
    const n = nums1.length;
    const m = nums2.length;
    // dp layer t over prefix lengths (a, b): the best score of exactly t
    // pairs inside nums1[0..a) x nums2[0..b). Layer 0 is identically 0, and
    // layer t only has feasible cells at a >= t, b >= t (fewer than t
    // elements cannot host t pairs); every prev[a-1][b-1] read at such a
    // cell lies inside layer t-1's feasible rectangle, so no sentinel is
    // ever needed.
    let prev: number[][] = [];
    let cur: number[][] = [];
    for (let a = 0; a <= n; a++) {
        prev.push(new Array(m + 1).fill(0));
        cur.push(new Array(m + 1).fill(0));
    }
    for (let t = 1; t <= k; t++) {
        for (let a = t; a <= n; a++) {
            const row = cur[a];
            const up = cur[a - 1];
            const prow = prev[a - 1];
            const x = nums1[a - 1];
            for (let b = t; b <= m; b++) {
                let best = prow[b - 1] + x * nums2[b - 1];
                if (a > t && up[b] > best) {
                    best = up[b];
                }
                if (b > t && row[b - 1] > best) {
                    best = row[b - 1];
                }
                row[b] = best;
            }
        }
        [prev, cur] = [cur, prev];
    }
    return prev[n][m];
}
