function maxArea(mat: number[][]): number {
    const m = mat.length;
    const n = mat[0].length;
    // prefix[i][j] = usable cells in mat[0..i)[0..j): any k-square's fill
    // is then four lookups, so "all ones" is an O(1) test.
    const prefix: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            prefix[i + 1][j + 1] = prefix[i + 1][j] + prefix[i][j + 1] - prefix[i][j] + mat[i][j];
        }
    }
    // Binary search the largest feasible side; area is side squared.
    let lo = 0;
    let hi = Math.min(m, n);
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (hasDisjointPair(prefix, mid)) {
            lo = mid;
        } else {
            hi = mid - 1;
        }
    }
    return lo * lo;
}

// A disjoint pair exists iff the valid corners span >= k rows or >= k
// columns: extreme-row corners give disjoint row ranges, and if both spans
// are < k every pair of squares intersects. The same corner twice spans
// 0 < k, so it never counts as a pair.
function hasDisjointPair(prefix: number[][], k: number): boolean {
    const m = prefix.length - 1;
    const n = prefix[0].length - 1;
    let minRow = m + n;
    let minCol = m + n;
    let maxRow = -1;
    let maxCol = -1;
    const kk = k * k;
    for (let r = 0; r + k <= m; ++r) {
        for (let c = 0; c + k <= n; ++c) {
            if (prefix[r + k][c + k] - prefix[r][c + k] - prefix[r + k][c] + prefix[r][c] === kk) {
                if (r < minRow) minRow = r;
                if (r > maxRow) maxRow = r;
                if (c < minCol) minCol = c;
                if (c > maxCol) maxCol = c;
            }
        }
    }
    if (maxRow < 0) return false;
    return maxRow - minRow >= k || maxCol - minCol >= k;
}
